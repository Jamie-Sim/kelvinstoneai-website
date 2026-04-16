"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
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
      <a href="#hero" className="nav-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand_assets/Logo_Black.png"
          alt="Kelvinstone AI logo"
          className="nav-logo"
        />
        <span className="nav-brand-name">Kelvinstone AI</span>
      </a>
      <ul className="nav-links">
        <li><a href="#pain">The Problem</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#process">Process</a></li>
        <li><a href="#benefits">Why Us</a></li>
      </ul>
      <a href="#cta" className="nav-cta">Get a Free Audit</a>
    </nav>
  );
}
