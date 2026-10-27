"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Animations déclaratives, pilotées par attributs HTML :
 *   data-intro        révélation au chargement (lignes masquées)
 *   data-split        titre révélé ligne par ligne au scroll
 *   data-reveal       fondu + montée au scroll (data-reveal="stagger" pour les enfants)
 *   data-scrub-words  mots qui s'illuminent au fil du scroll (manifeste)
 *   data-parallax     décalage vertical (valeur = intensité, ex. "0.2")
 *   data-counter      compteur animé jusqu'à la valeur indiquée
 *   data-hscroll      piste horizontale épinglée (desktop uniquement)
 *
 * Les sections restent des composants serveur : le contenu est indexable et
 * lisible sans JavaScript ; seules les animations sont ajoutées côté client.
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (reduced) {
      root.classList.add("motion-ready");
      return;
    }

    root.classList.remove("motion-ready");
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Intro du hero.
        gsap.utils.toArray<HTMLElement>("[data-intro]").forEach((el, i) => {
          if (el.dataset.intro === "lines") {
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit: (self) =>
                gsap.from(self.lines, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.09, delay: 0.15 }),
            });
          } else {
            gsap.from(el, { y: 24, autoAlpha: 0, duration: 1.1, ease: "expo.out", delay: 0.55 + i * 0.08 });
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.08,
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const targets = el.dataset.reveal === "stagger" ? Array.from(el.children) : el;
          gsap.fromTo(
            targets,
            { y: 36, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
          const split = SplitText.create(el, { type: "words" });
          gsap.fromTo(
            split.words,
            { opacity: 0.14 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("[data-scrub-scope]") ?? el,
                start: "top 65%",
                end: "bottom 85%",
                scrub: true,
              },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const k = Number(el.dataset.parallax) || 0.2;
          gsap.to(el, {
            yPercent: -100 * k,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-fade-out]").forEach((el) => {
          gsap.to(el, {
            autoAlpha: 0,
            y: -80,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom 20%", scrub: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
          const value = Number(el.dataset.counter);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: value,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onUpdate: () => (el.textContent = String(Math.round(obj.v))),
          });
        });

        // Piste horizontale épinglée : desktop uniquement, empilée sur mobile.
        mm.add("(min-width: 900px)", () => {
          gsap.utils.toArray<HTMLElement>("[data-hscroll]").forEach((section) => {
            const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
            if (!track) return;
            const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            });
          });
        });
      });

      root.classList.add("motion-ready");
      ScrollTrigger.refresh();
    };

    // Attendre les polices pour un découpage en lignes correct.
    (document.fonts?.ready ?? Promise.resolve()).then(setup);

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
