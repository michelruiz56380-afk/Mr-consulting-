"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fond narratif : un champ de particules qui passe du chaos à l'ordre.
 *
 * Chaque section de la page porte un attribut `data-formation="<index>"`.
 * Quand la section devient active, les particules se réorganisent vers la
 * formation correspondante :
 *   0 chaos · 1 sphère · 2 trajectoire · 3 grille · 4 réseau · 5 « MR » · 6 galaxie · 7 horizon
 *
 * Canvas 2D (pas de dépendance WebGL) : léger, compatible partout, et mis en
 * pause hors écran / onglet masqué.
 */

type Vec = Float32Array; // x, y, z entrelacés

const FORMATION_COUNT = 8;
const COLORS = ["#3d6bff", "#36e2ff", "#e9f1ff", "#7a5cff"];

function rand(seed: { s: number }) {
  // PRNG déterministe (mulberry32) : rendu identique à chaque visite.
  let t = (seed.s += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function gauss(seed: { s: number }) {
  return (rand(seed) + rand(seed) + rand(seed) - 1.5) / 1.5;
}

function sampleText(text: string, count: number, seed: { s: number }): [number, number][] {
  const w = 600;
  const h = 300;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) return [];
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 250px Geist, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText(text, w / 2, h / 2 + 10);
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: [number, number][] = [];
  for (let y = 0; y < h; y += 3) {
    for (let x = 0; x < w; x += 3) {
      if (data[(y * w + x) * 4 + 3] > 128) pts.push([(x - w / 2) / (w / 2), (y - h / 2) / (w / 2)]);
    }
  }
  const out: [number, number][] = [];
  for (let i = 0; i < count; i++) out.push(pts[Math.floor(rand(seed) * pts.length)] ?? [0, 0]);
  return out;
}

function buildFormations(n: number): { forms: Vec[]; edges: Uint16Array } {
  const seed = { s: 1337 };
  const forms: Vec[] = Array.from({ length: FORMATION_COUNT }, () => new Float32Array(n * 3));
  const textPts = sampleText("MR", n, seed);

  // Réseau : centres de clusters répartis sur une sphère.
  const clusterCount = 9;
  const centers: [number, number, number][] = [];
  for (let k = 0; k < clusterCount; k++) {
    const phi = Math.acos(1 - (2 * (k + 0.5)) / clusterCount);
    const th = Math.PI * (1 + Math.sqrt(5)) * k;
    centers.push([0.85 * Math.sin(phi) * Math.cos(th), 0.65 * Math.cos(phi), 0.85 * Math.sin(phi) * Math.sin(th)]);
  }
  const clusterOf = new Uint8Array(n);

  const gridCols = Math.ceil(Math.sqrt(n * 1.6));
  const gridRows = Math.ceil(n / gridCols);
  const streams = 28;

  for (let i = 0; i < n; i++) {
    const o = i * 3;
    const r = (f: Vec, x: number, y: number, z: number) => {
      f[o] = x;
      f[o + 1] = y;
      f[o + 2] = z;
    };

    // 0 — chaos
    {
      // Nuage turbulent : dense au cœur, filaments épars en périphérie.
      const rad = Math.pow(rand(seed), 0.55) * 1.25;
      const th = rand(seed) * Math.PI * 2;
      const ph = Math.acos(rand(seed) * 2 - 1);
      const swirl = Math.sin(th * 3 + rad * 4) * 0.12;
      r(forms[0], rad * Math.sin(ph) * Math.cos(th) * 1.25 + swirl, rad * Math.cos(ph) * 0.85, rad * Math.sin(ph) * Math.sin(th));
    }

    // 1 — sphère de Fibonacci
    {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
      const th = Math.PI * (1 + Math.sqrt(5)) * i;
      const rad = 0.72;
      r(forms[1], rad * Math.sin(phi) * Math.cos(th), rad * Math.cos(phi), rad * Math.sin(phi) * Math.sin(th));
    }

    // 2 — trajectoire : des flux dispersés qui convergent vers un cap
    {
      const k = i % streams;
      const t = rand(seed);
      const spread = (k / (streams - 1) - 0.5) * 1.8;
      const ease = Math.pow(1 - t, 1.6);
      const wobble = Math.sin(t * 9 + k) * 0.04 * ease;
      r(forms[2], -1.5 + 2.9 * t, spread * ease + wobble, Math.cos(k * 1.7) * 0.6 * ease);
    }

    // 3 — grille d'audit (plan incliné)
    {
      const cx = i % gridCols;
      const cy = Math.floor(i / gridCols);
      const x = (cx / (gridCols - 1) - 0.5) * 2.4;
      const z = (cy / Math.max(1, gridRows - 1) - 0.5) * 1.8;
      r(forms[3], x, 0.35 + z * 0.12, z);
    }

    // 4 — réseau neuronal (clusters)
    {
      const k = Math.floor(rand(seed) * clusterCount);
      clusterOf[i] = k;
      const [cx, cy, cz] = centers[k];
      const s = 0.13;
      r(forms[4], cx + gauss(seed) * s, cy + gauss(seed) * s, cz + gauss(seed) * s);
    }

    // 5 — monogramme « MR »
    {
      const [x, y] = textPts[i];
      r(forms[5], x * 1.05 + gauss(seed) * 0.004, y * 1.05 + gauss(seed) * 0.004, gauss(seed) * 0.05);
    }

    // 6 — galaxie : un noyau unique, des bras qui s'organisent autour
    {
      const arm = i % 3;
      const t = Math.pow(rand(seed), 0.7);
      const ang = arm * ((Math.PI * 2) / 3) + t * 5.2;
      const rad = 0.06 + t * 1.05;
      const sc = 0.05 + t * 0.08;
      r(forms[6], Math.cos(ang) * rad + gauss(seed) * sc, gauss(seed) * 0.04, Math.sin(ang) * rad + gauss(seed) * sc);
    }

    // 7 — horizon : une surface calme
    {
      const cx = i % gridCols;
      const cy = Math.floor(i / gridCols);
      const x = (cx / (gridCols - 1) - 0.5) * 3.2;
      const z = (cy / Math.max(1, gridRows - 1) - 0.5) * 2.2;
      r(forms[7], x, 0.55 + Math.sin(x * 2.2) * 0.05 + Math.cos(z * 3) * 0.04, z);
    }
  }

  // Arêtes du réseau : quelques liaisons intra-cluster et inter-clusters.
  const edges: number[] = [];
  const f4 = forms[4];
  for (let i = 0; i < n && edges.length < 900; i += 3) {
    for (let j = i + 1; j < Math.min(n, i + 60); j++) {
      if (clusterOf[i] !== clusterOf[j]) continue;
      const dx = f4[i * 3] - f4[j * 3];
      const dy = f4[i * 3 + 1] - f4[j * 3 + 1];
      const dz = f4[i * 3 + 2] - f4[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < 0.012) {
        edges.push(i, j);
        break;
      }
    }
  }
  for (let k = 0; k < clusterCount; k++) {
    const a = clusterOf.indexOf(k);
    const b = clusterOf.indexOf((k + 2) % clusterCount);
    const c = clusterOf.indexOf((k + 3) % clusterCount);
    if (a >= 0 && b >= 0) edges.push(a, b);
    if (a >= 0 && c >= 0) edges.push(a, c);
  }

  return { forms, edges: new Uint16Array(edges) };
}

export default function StoryCanvas({ initial = 0 }: { initial?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    const n = small ? 650 : 1500;

    let forms: Vec[] = [];
    let edges: Uint16Array = new Uint16Array();
    let built = false;
    const build = () => {
      ({ forms, edges } = buildFormations(n));
      built = true;
    };
    // Laisser la police se charger pour le monogramme, sans bloquer.
    if (document.fonts?.ready) document.fonts.ready.then(build);
    else build();

    const delays = new Float32Array(n);
    const colors: string[] = [];
    const seed = { s: 7 };
    for (let i = 0; i < n; i++) {
      delays[i] = rand(seed);
      colors.push(COLORS[i % 7 === 0 ? 2 : i % 11 === 0 ? 3 : i % 2]);
    }
    const px = new Float32Array(n * 2);
    const pz = new Float32Array(n);

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const state = { morph: initial, target: initial, cx: 0.5, cxTarget: 0.5 };
    const pointer = { x: -9999, y: -9999, tx: 0, ty: 0, sx: 0, sy: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!small) window.addEventListener("pointermove", onMove, { passive: true });

    // Liaison scroll → formation.
    const triggers: ScrollTrigger[] = [];
    document.querySelectorAll<HTMLElement>("[data-formation]").forEach((el) => {
      const f = Number(el.dataset.formation);
      // Position horizontale du motif (desktop) : à l'opposé du texte de la section.
      const x = small ? 0.5 : Number(el.dataset.canvasX ?? 0.5);
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) {
              state.target = f;
              state.cxTarget = x;
            }
          },
        })
      );
    });

    const first = document.querySelector<HTMLElement>("[data-formation]");
    if (first && !small) state.cx = state.cxTarget = Number(first.dataset.canvasX ?? 0.5);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);

    const smooth = (t: number) => t * t * (3 - 2 * t);
    let raf = 0;
    let last = performance.now();
    let time = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || document.hidden || !built) return;
      time += reduced ? 0 : dt;

      state.morph += (state.target - state.morph) * Math.min(1, dt * (reduced ? 6 : 1.9));
      state.cx += (state.cxTarget - state.cx) * Math.min(1, dt * 1.6);
      pointer.sx += (pointer.tx - pointer.sx) * 0.04;
      pointer.sy += (pointer.ty - pointer.sy) * 0.04;

      const a = Math.max(0, Math.min(FORMATION_COUNT - 1, Math.floor(state.morph)));
      const b = Math.min(FORMATION_COUNT - 1, a + 1);
      const frac = state.morph - a;
      const A = forms[a];
      const B = forms[b];

      // Agitation : forte dans le chaos, quasi nulle dans les formations ordonnées.
      const chaos = Math.max(0, 1 - state.morph) * 0.06 + 0.004;

      const unit = Math.min(w, h) * (small ? 0.42 : 0.5);
      const cx = w * state.cx;
      const cy = h * 0.5;
      const rotY = time * 0.06 + pointer.sx * 0.35;
      const rotX = -0.18 + pointer.sy * 0.15;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      // Le monogramme reste face caméra.
      const faceWeight = a === 5 ? 1 - smooth(frac) : b === 5 ? smooth(frac) : 0;
      const fov = 2.6;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < n; i++) {
        const o = i * 3;
        // Décalage individuel : les particules ne bougent pas toutes à l'unisson.
        const local = Math.max(0, Math.min(1, frac * 1.5 - delays[i] * 0.5));
        const t = smooth(local);
        let x = A[o] + (B[o] - A[o]) * t;
        let y = A[o + 1] + (B[o + 1] - A[o + 1]) * t;
        let z = A[o + 2] + (B[o + 2] - A[o + 2]) * t;

        const ph = i * 0.37;
        x += Math.sin(time * 0.9 + ph) * chaos;
        y += Math.cos(time * 0.7 + ph * 1.3) * chaos;
        z += Math.sin(time * 0.8 + ph * 0.7) * chaos;

        // Rotation (atténuée pour le monogramme).
        const ry = rotY * (1 - faceWeight) + pointer.sx * 0.25 * faceWeight;
        const cyR = faceWeight > 0 ? Math.cos(ry) : cosY;
        const syR = faceWeight > 0 ? Math.sin(ry) : sinY;
        const x1 = x * cyR + z * syR;
        const z1 = -x * syR + z * cyR;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const s = fov / (fov + z2);
        let sx = cx + x1 * unit * s;
        let sy = cy + y1 * unit * s;

        // Micro-interaction : légère répulsion autour du pointeur.
        const dx = sx - pointer.x;
        const dy = sy - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (1 - d2 / 14000) * 18;
          const d = Math.sqrt(d2) || 1;
          sx += (dx / d) * f;
          sy += (dy / d) * f;
        }

        px[i * 2] = sx;
        px[i * 2 + 1] = sy;
        pz[i] = s;

        const size = Math.max(0.7, (small ? 1.5 : 1.9) * s * s);
        ctx.globalAlpha = Math.max(0.08, Math.min(0.9, (s - 0.45) * 1.1));
        ctx.fillStyle = colors[i];
        ctx.fillRect(sx - size / 2, sy - size / 2, size, size);
      }

      // Liaisons du réseau (formation IA).
      const netWeight = a === 4 ? 1 - smooth(frac) : b === 4 ? smooth(frac) : 0;
      if (netWeight > 0.02) {
        ctx.globalAlpha = 0.22 * netWeight;
        ctx.strokeStyle = "#36e2ff";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        for (let e = 0; e < edges.length; e += 2) {
          const p = edges[e];
          const q = edges[e + 1];
          ctx.moveTo(px[p * 2], px[p * 2 + 1]);
          ctx.lineTo(px[q * 2], px[q * 2 + 1]);
        }
        ctx.stroke();
      }

      // Ligne de balayage (formation audit).
      const auditWeight = a === 3 ? 1 - smooth(frac) : b === 3 ? smooth(frac) : 0;
      if (auditWeight > 0.02) {
        const scan = ((time * 0.18) % 1) * h;
        const g = ctx.createLinearGradient(0, scan - 80, 0, scan + 2);
        g.addColorStop(0, "rgba(54,226,255,0)");
        g.addColorStop(1, "rgba(54,226,255,0.16)");
        ctx.globalAlpha = auditWeight;
        ctx.fillStyle = g;
        ctx.fillRect(0, scan - 80, w, 82);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      triggers.forEach((t) => t.kill());
      io.disconnect();
    };
  }, [initial]);

  return (
    <>
      <div className="aurora" aria-hidden="true" />
      <canvas ref={ref} className="story-canvas" aria-hidden="true" />
    </>
  );
}
