"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export function scrollToTarget(target: string | HTMLElement) {
  if (lenis) lenis.scrollTo(target, { offset: -80 });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

/** Défilement inertiel (Lenis) synchronisé avec GSAP ScrollTrigger. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ duration: 1.15, anchors: { offset: -80 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      lenis?.scrollTo(0, { immediate: true });
      return;
    }
    // Arrivée sur une ancre depuis une autre page : attendre la mise en page.
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      scrollToTarget(hash);
    }, 150);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
