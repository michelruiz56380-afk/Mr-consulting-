"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, hero } from "@/lib/content";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > lastY);
      lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`site-header${hidden && !open ? " is-hidden" : ""}${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
    >
      <div className="site-header__progress" ref={progressRef} aria-hidden="true" />
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="MR Consulting — accueil">
          <Logo />
          <span className="brand__name">
            MR <span>Consulting</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Navigation principale">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/#contact" className="btn btn--small btn--primary nav-cta">
          {hero.ctaPrimary}
        </Link>

        <button
          className="burger"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" inert={!open} aria-hidden={!open}>
        <ul>
          {nav.map((item, i) => (
            <li key={item.href} style={{ transitionDelay: `${0.05 + i * 0.05}s` }}>
              <span className="mono">0{i + 1}</span>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          <li style={{ transitionDelay: "0.3s" }}>
            <span className="mono">05</span>
            <Link href="/#contact" onClick={() => setOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
