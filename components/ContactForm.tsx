"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { needs, site } from "@/lib/content";

type Status = { kind: "idle" | "sending" | "success" | "error"; message?: string };

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Une erreur est survenue.");
      form.reset();
      setStatus({
        kind: "success",
        message: "Merci ! Votre demande est bien envoyée. Un e-mail de confirmation vient de vous être adressé ; nous revenons vers vous sous 48 h ouvrées.",
      });
    } catch (err) {
      setStatus({
        kind: "error",
        message: `${err instanceof Error ? err.message : "Une erreur est survenue."} Vous pouvez aussi écrire à ${site.email}.`,
      });
    }
  }

  return (
    <form className={`contact-form${compact ? " contact-form--compact" : ""}`} onSubmit={onSubmit} noValidate={false}>
      <div className="field">
        <label htmlFor="cf-name">Nom et prénom *</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required maxLength={120} />
      </div>
      <div className="field">
        <label htmlFor="cf-email">E-mail professionnel *</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" required maxLength={160} />
      </div>
      <div className="field">
        <label htmlFor="cf-company">Organisation</label>
        <input id="cf-company" name="company" type="text" autoComplete="organization" maxLength={160} />
      </div>
      <div className="field">
        <label htmlFor="cf-need">Votre besoin *</label>
        <select id="cf-need" name="need" required defaultValue="">
          <option value="" disabled>
            Sélectionner…
          </option>
          {needs.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="field field--full">
        <label htmlFor="cf-message">Votre projet en quelques lignes *</label>
        <textarea id="cf-message" name="message" required minLength={10} maxLength={4000} rows={compact ? 4 : 6} />
      </div>
      {/* Pot de miel anti-spam : invisible pour les humains. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Site web</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="field field--full field--check">
        <input id="cf-consent" name="consent" type="checkbox" required value="yes" />
        <label htmlFor="cf-consent">
          J’accepte que MR Consulting utilise ces informations pour répondre à ma demande. Elles ne sont ni cédées ni
          utilisées à d’autres fins. <Link href="/confidentialite">Politique de confidentialité</Link>.
        </label>
      </div>
      <div className="field--full contact-form__actions">
        <button className="btn btn--primary" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
          <span className="btn__arrow" aria-hidden="true">
            →
          </span>
        </button>
        {site.bookingUrl ? (
          <a className="btn btn--ghost" href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
            Réserver un créneau
          </a>
        ) : null}
      </div>
      <p className={`form-status form-status--${status.kind}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
