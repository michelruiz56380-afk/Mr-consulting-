import { ImageResponse } from "next/og";

export const alt = "MR Consulting — Nous rendons les technologies utiles et maîtrisées";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const dots = Array.from({ length: 120 }, (_, i) => {
    const a = i * 2.39996;
    const r = 18 * Math.sqrt(i);
    return { x: 900 + Math.cos(a) * r, y: 315 + Math.sin(a) * r * 0.9, o: 0.25 + (i % 5) * 0.12 };
  });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(circle at 75% 50%, #161a26 0%, #0b0c0f 60%)",
          color: "#f3f1ec",
          padding: 80,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: 4,
              height: 4,
              borderRadius: 4,
              background: i % 2 ? "#f3f1ec" : "#4d7cff",
              opacity: d.o,
            }}
          />
        ))}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 700 }}>
          <div style={{ fontSize: 28, letterSpacing: 4, color: "#7a9cff", display: "flex" }}>MR CONSULTING</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, display: "flex" }}>
            Nous rendons les technologies utiles et maîtrisées.
          </div>
          <div style={{ fontSize: 26, color: "#a6a39b", display: "flex" }}>
            Accompagnement · Audit · IA · Idéation & Création
          </div>
        </div>
      </div>
    ),
    size
  );
}
