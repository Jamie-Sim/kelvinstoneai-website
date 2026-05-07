"use client";

import { useEffect } from "react";

export default function RevealObserver() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    // First pass: anything already in or above the viewport on mount
    // gets revealed immediately (no scroll needed). Without this, large
    // above-the-fold elements like a long blog body never trip the
    // IntersectionObserver threshold and stay at opacity 0.
    const viewportHeight = window.innerHeight;
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportHeight) {
        el.classList.add("visible");
      }
    });

    // Second pass: observe the rest for scroll-triggered reveal.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      // threshold 0 = fire as soon as any pixel enters viewport. Safer
      // than 0.1 for large elements where 10% may exceed the viewport.
      { threshold: 0 },
    );
    elements.forEach((el) => {
      if (!el.classList.contains("visible")) {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
