"use client";

import { useEffect, useRef } from "react";

type Prefill = {
  name?: string;
  email?: string;
};

type Props = {
  url: string;
  prefill?: Prefill;
  height?: number;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Prefill;
      }) => void;
    };
  }
}

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

export default function CalendlyInline({ url, prefill, height = 720 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;

    const init = () => {
      if (!window.Calendly || !parent) return;
      parent.innerHTML = "";
      window.Calendly.initInlineWidget({ url, parentElement: parent, prefill });
    };

    if (window.Calendly) {
      init();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    );
    if (existing) {
      existing.addEventListener("load", init);
      return () => existing.removeEventListener("load", init);
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, [url, prefill]);

  return (
    <div
      ref={ref}
      style={{ minWidth: 320, width: "100%", height }}
      aria-label="Calendly booking widget"
    />
  );
}
