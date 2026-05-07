import { ApiError, GoogleGenAI } from "@google/genai";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MODEL = "gemini-2.5-flash-image";
const BUCKET = "content-images";

export class ImageGenerationError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ImageGenerationError";
  }
}

function friendlyGeminiError(err: unknown): ImageGenerationError {
  if (err instanceof ApiError) {
    const raw = err.message ?? "";
    if (err.status === 429) {
      if (/free[_ ]tier|limit:\s*0/i.test(raw)) {
        return new ImageGenerationError(
          "Google AI billing isn't enabled on this project. Image generation is a paid feature — go to aistudio.google.com → Settings → your project → Set up billing, then try again.",
          err,
        );
      }
      const retry = /retry in (\d+(?:\.\d+)?)\s*s/i.exec(raw);
      return new ImageGenerationError(
        retry
          ? `Hit Google AI rate limit. Try again in ${Math.ceil(Number(retry[1]))}s.`
          : "Hit Google AI rate limit. Wait a minute and try again.",
        err,
      );
    }
    if (err.status === 401 || err.status === 403) {
      return new ImageGenerationError(
        "Google AI rejected the API key. Check GOOGLE_AI_API_KEY in .env.local — the key may be invalid, expired, or scoped to a project that doesn't have image generation enabled.",
        err,
      );
    }
    if (err.status === 400) {
      const trimmed = raw.replace(/\s+/g, " ").slice(0, 220);
      return new ImageGenerationError(
        `Google AI rejected the request: ${trimmed}`,
        err,
      );
    }
    if (err.status >= 500) {
      return new ImageGenerationError(
        "Google AI service error. Try again in a minute.",
        err,
      );
    }
  }
  const message = err instanceof Error ? err.message : String(err);
  return new ImageGenerationError(`Image generation failed: ${message}`, err);
}

export type ImagePreset = "blog-hero" | "linkedin-square";

const ASPECT_RATIOS: Record<ImagePreset, string> = {
  "blog-hero": "16:9",
  "linkedin-square": "1:1",
};

let cached: GoogleGenAI | null = null;
function client(): GoogleGenAI {
  if (cached) return cached;
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY missing — add it to .env.local");
  }
  cached = new GoogleGenAI({ apiKey });
  return cached;
}

export type GeneratedImage = {
  publicUrl: string;
  storagePath: string;
};

type GeminiContents = Parameters<
  GoogleGenAI["models"]["generateContent"]
>[0]["contents"];

async function callGeminiImage(
  contents: GeminiContents,
  preset: ImagePreset,
  withAspectRatio: boolean,
): Promise<GeneratedImage> {
  let response;
  try {
    response = await client().models.generateContent({
      model: MODEL,
      contents,
      config: {
        responseModalities: ["IMAGE"],
        // Aspect ratio is only honoured on text-to-image. On image-to-image
        // (refinement), Gemini preserves the input image's aspect ratio
        // automatically — passing it again can cause distortion.
        ...(withAspectRatio
          ? { imageConfig: { aspectRatio: ASPECT_RATIOS[preset] } }
          : {}),
      },
    });
  } catch (err) {
    console.error("[generateImage] Gemini call failed", err);
    throw friendlyGeminiError(err);
  }

  const candidates = response.candidates ?? [];
  const parts = candidates[0]?.content?.parts ?? [];
  const imagePart = parts.find((part) => part.inlineData?.data);
  if (!imagePart?.inlineData?.data) {
    throw new ImageGenerationError(
      "Gemini returned no image data. The prompt may have been blocked by safety filters — try rephrasing it.",
    );
  }

  const mimeType = imagePart.inlineData.mimeType ?? "image/png";
  const ext = mimeType.split("/")[1] ?? "png";
  const buffer = Buffer.from(imagePart.inlineData.data, "base64");

  const filename = `${preset}/${Date.now()}-${crypto
    .randomUUID()
    .slice(0, 8)}.${ext}`;

  const supabase = supabaseAdmin();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filename, buffer, { contentType: mimeType, upsert: false });
  if (uploadError) {
    throw new ImageGenerationError(
      `Image generated, but Supabase Storage upload failed: ${uploadError.message}`,
      uploadError,
    );
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return { publicUrl: data.publicUrl, storagePath: filename };
}

export async function generateImage(args: {
  prompt: string;
  preset: ImagePreset;
}): Promise<GeneratedImage> {
  return callGeminiImage(args.prompt, args.preset, true);
}

/**
 * Image-to-image edit. Takes the previous image bytes plus a tweak instruction
 * ("remove the USB stick", "make the wallpaper deep blue") and returns a
 * version with only those changes applied — Gemini preserves composition.
 */
export async function refineImage(args: {
  previousImageUrl: string;
  refineNote: string;
  preset: ImagePreset;
}): Promise<GeneratedImage> {
  const fetched = await fetch(args.previousImageUrl);
  if (!fetched.ok) {
    throw new ImageGenerationError(
      `Couldn't load the previous image to refine (HTTP ${fetched.status}). Try regenerating from scratch instead.`,
    );
  }
  const mimeType = fetched.headers.get("content-type") ?? "image/png";
  const arrayBuffer = await fetched.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  const contents = [
    {
      role: "user" as const,
      parts: [
        { inlineData: { mimeType, data: base64 } },
        {
          text: `Edit the image with these specific changes: ${args.refineNote.trim()}\n\nKeep everything else exactly the same — same composition, same subject, same style.`,
        },
      ],
    },
  ];

  return callGeminiImage(contents, args.preset, false);
}
