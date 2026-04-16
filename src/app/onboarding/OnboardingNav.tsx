"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function OnboardingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={scrolled ? "scrolled" : ""}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link href="/" className="nav-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand_assets/Logo_Black.png"
          alt="Kelvinstone AI logo"
          className="nav-logo"
        />
        <span className="nav-brand-name">Kelvinstone AI</span>
      </Link>
      <Link href="/" className="nav-back" aria-label="Back to main site">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 12L6 8l4-4" />
        </svg>
        Back to site
      </Link>
    </nav>
  );
}
