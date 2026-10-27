import { NextResponse } from "next/server";
import { site } from "@/lib/content";

/**
 * Réception du formulaire de contact.
 * - validation serveur, pot de miel, délai minimal de saisie, limitation de débit ;
 * - notification à MR Consulting + accusé de réception au demandeur via Resend ;
 * - aucune donnée n'est stockée par le site.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NEEDS = ["Accompagnement", "Audit", "Intelligence artificielle", "Idéation & Création", "Autre"];

// Limitation simple en mémoire (par instance) : 5 envois / 10 min / IP.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(payload: { to: string; subject: string; html: string; reply_to?: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  if (!key || !from) {
    // En production, ne jamais confirmer un envoi qui n'a pas eu lieu (demande perdue).
    if (process.env.NODE_ENV === "production") throw new Error("RESEND_API_KEY / CONTACT_FROM manquants");
    console.warn("[contact] Envoi simulé (développement) :", payload.subject);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, ...payload }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Trop de demandes, merci de réessayer dans quelques minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const str = (k: string, max: number) => String(body[k] ?? "").trim().slice(0, max);
  const name = str("name", 120);
  const email = str("email", 160);
  const company = str("company", 160);
  const need = str("need", 60);
  const message = str("message", 4000);

  // Robots : champ piège rempli ou formulaire soumis trop vite → succès silencieux.
  if (str("website", 200) || Number(body.elapsed) < 2500) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !EMAIL_RE.test(email) || !NEEDS.includes(need) || message.length < 10 || body.consent !== "yes") {
    return NextResponse.json({ error: "Merci de vérifier les champs obligatoires." }, { status: 422 });
  }

  const to = process.env.CONTACT_TO || site.email;
  try {
    await sendEmail({
      to,
      reply_to: email,
      subject: `Nouvelle demande — ${need} — ${name}`,
      html: `<h2>Nouvelle demande via le site</h2>
<p><strong>Nom :</strong> ${escape(name)}<br/><strong>E-mail :</strong> ${escape(email)}<br/>
<strong>Organisation :</strong> ${escape(company || "—")}<br/><strong>Besoin :</strong> ${escape(need)}</p>
<p style="white-space:pre-wrap">${escape(message)}</p>`,
    });
    await sendEmail({
      to: email,
      subject: "MR Consulting — nous avons bien reçu votre demande",
      html: `<p>Bonjour ${escape(name)},</p>
<p>Merci pour votre message concernant : <strong>${escape(need)}</strong>.</p>
<p>Nous revenons vers vous sous 48 h ouvrées pour organiser un premier échange, sans engagement.</p>
<p>— MR Consulting<br/><a href="${site.url}">${site.url.replace(/^https?:\/\//, "")}</a></p>
<p style="color:#888;font-size:12px">Vous recevez cet e-mail suite à votre demande sur notre site. Vos données sont utilisées uniquement pour y répondre (voir ${site.url}/confidentialite).</p>`,
    });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "L’envoi a échoué." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
