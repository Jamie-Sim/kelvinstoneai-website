"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/#pain", label: "The Problem" },
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#benefits", label: "Why Us" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        id="navbar"
        className={`${scrolled ? "scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="/" className="nav-brand" onClick={closeMenu}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand_assets/Logo_Black.png"
            alt="Kelvinstone AI logo"
            className="nav-logo"
          />
          <span className="nav-brand-name">Kelvinstone AI</span>
        </a>
        <ul className="nav-links">
          {NAV_ITEMS.map((it) => (
            <li key={it.href}>
              <a href={it.href}>{it.label}</a>
            </li>
          ))}
        </ul>
        <a href="/#cta" className="nav-cta">Get a Free Audit</a>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </nav>
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-menu-links">
          {NAV_ITEMS.map((it) => (
            <li key={it.href}>
              <a href={it.href} onClick={closeMenu}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="/#cta" className="mobile-menu-cta" onClick={closeMenu}>
          Get a Free Audit
        </a>
      </div>
    </>
  );
}
