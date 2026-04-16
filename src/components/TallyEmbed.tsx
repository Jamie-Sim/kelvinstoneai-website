"use client";

import { useEffect } from "react";

type TallyApi = { loadEmbeds: () => void };
declare global {
  interface Window {
    Tally?: TallyApi;
  }
}

const TALLY_SCRIPT_SRC = "https://tally.so/widgets/embed.js";

type Props = {
  formId: string;
  title?: string;
};

export default function TallyEmbed({ formId, title = "Tally form" }: Props) {
  useEffect(() => {
    const loadEmbeds = () => {
      if (window.Tally) {
        window.Tally.loadEmbeds();
        return;
      }
      document
        .querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])")
        .forEach((el) => {
          const src = el.dataset.tallySrc;
          if (src) el.src = src;
        });
    };

    if (window.Tally) {
      loadEmbeds();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TALLY_SCRIPT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", loadEmbeds);
      return () => existing.removeEventListener("load", loadEmbeds);
    }

    const script = document.createElement("script");
    script.src = TALLY_SCRIPT_SRC;
    script.onload = loadEmbeds;
    script.onerror = loadEmbeds;
    document.body.appendChild(script);
  }, []);

  const src = `https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

  return (
    <iframe
      data-tally-src={src}
      loading="lazy"
      width="100%"
      height="100%"
      frameBorder={0}
      marginHeight={0}
      marginWidth={0}
      title={title}
    />
  );
}
