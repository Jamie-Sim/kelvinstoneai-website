"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const baseRef = useRef<SVGPatternElement | null>(null);
  const activeRef = useRef<SVGPatternElement | null>(null);
  const activeWrapRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const GRID_SIZE = 80;
    const SPEED = 0.35;
    const FLASHLIGHT_R = 320;

    const hero = heroRef.current;
    const gpBase = baseRef.current;
    const gpActive = activeRef.current;
    const activeEl = activeWrapRef.current;
    if (!hero || !gpBase || !gpActive || !activeEl) return;

    let offsetX = 0;
    let offsetY = 0;
    let raf = 0;
    let isHovered = false;

    const tick = () => {
      offsetX = (offsetX + SPEED) % GRID_SIZE;
      offsetY = (offsetY + SPEED) % GRID_SIZE;
      gpBase.setAttribute("x", String(offsetX));
      gpBase.setAttribute("y", String(offsetY));
      gpActive.setAttribute("x", String(offsetX));
      gpActive.setAttribute("y", String(offsetY));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const mask = `radial-gradient(${FLASHLIGHT_R}px circle at ${mx}px ${my}px, black 0%, transparent 100%)`;
      activeEl.style.maskImage = mask;
      (activeEl.style as CSSStyleDeclaration & { webkitMaskImage?: string }).webkitMaskImage = mask;
      if (!isHovered) {
        activeEl.style.opacity = "0.55";
        isHovered = true;
      }
    };

    const onLeave = () => {
      activeEl.style.opacity = "0";
      isHovered = false;
    };

    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-grid" aria-hidden="true">
        <svg id="hero-grid-base" className="hero-grid-svg">
          <defs>
            <pattern
              id="gp-base"
              ref={baseRef}
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gp-base)" />
        </svg>
        <svg id="hero-grid-active" className="hero-grid-svg" ref={activeWrapRef}>
          <defs>
            <pattern
              id="gp-active"
              ref={activeRef}
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gp-active)" />
        </svg>
      </div>
      <div className="hero-vignette" aria-hidden="true"></div>

      <div className="hero-content">
        <div className="hero-dateline reveal">
          <span className="hero-dateline-rule"></span>
          <span className="hero-dateline-text">
            UK Property Maintenance &amp; Improvement &nbsp;·&nbsp; Built in Glasgow
          </span>
          <span className="hero-dateline-rule"></span>
        </div>

        <h1 className="hero-h1 reveal rd1">
          Practical AI for UK<br /><em>property businesses.</em>
        </h1>

        <div className="hero-accent-rule reveal rd2"></div>

        <p className="hero-sub reveal rd2">
          Better websites. Smarter follow-up. Fewer missed jobs.
        </p>

        <div className="hero-ctas reveal rd3">
          <a href="#cta" className="btn-terra">
            Find Where You&apos;re Losing Work
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
          <a href="#process" className="btn-outline">
            How It Works
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          </a>
        </div>
      </div>

      <div className="hero-stats reveal rd4">
        <div className="stat-block">
          <span className="stat-value">60 sec</span>
          <span className="stat-label">Enquiry to<br />your phone</span>
        </div>
        <div className="stat-block">
          <span className="stat-value">14 days</span>
          <span className="stat-label">Audit call to<br />live system</span>
        </div>
        <div className="stat-block">
          <span className="stat-value">£0</span>
          <span className="stat-label">Setup if we<br />miss the deadline</span>
        </div>
      </div>
      <p className="hero-stats-tagline reveal rd5">
        Built for UK property maintenance and improvement firms. Glasgow-based. UK-wide. Live in a fortnight — guaranteed.
      </p>
    </section>
  );
}
