import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const STUDIO_PREFIX = "/studio";
const STUDIO_API_PREFIX = "/api/studio";
const LOGIN_PATH = "/studio/login";
const CALLBACK_PATH = "/studio/auth/callback";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStudioPage = pathname.startsWith(STUDIO_PREFIX);
  const isStudioApi = pathname.startsWith(STUDIO_API_PREFIX);
  if (!isStudioPage && !isStudioApi) return NextResponse.next();

  // Login page and OAuth callback must remain public so the user can actually sign in.
  if (pathname === LOGIN_PATH || pathname.startsWith(CALLBACK_PATH)) {
    return NextResponse.next();
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const allowedEmail = process.env.STUDIO_ALLOWED_EMAIL?.toLowerCase();

  if (!url || !key || !allowedEmail) {
    return jsonOrRedirect(request, isStudioApi, 503, "Studio auth is not configured.");
  }

  const response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set({ name, value, ...options });
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return jsonOrRedirect(request, isStudioApi, 401, "Sign-in required.");
  }

  if (user.email?.toLowerCase() !== allowedEmail) {
    await supabase.auth.signOut();
    return jsonOrRedirect(request, isStudioApi, 403, "Email not allow-listed for /studio.");
  }

  return response;
}

function jsonOrRedirect(
  request: NextRequest,
  isApi: boolean,
  status: number,
  message: string,
) {
  if (isApi) {
    return NextResponse.json({ ok: false, error: message }, { status });
  }
  const url = request.nextUrl.clone();
  url.pathname = LOGIN_PATH;
  url.searchParams.set("from", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/studio/:path*", "/api/studio/:path*"],
};
