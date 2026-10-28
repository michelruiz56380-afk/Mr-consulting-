"use client";

import { useRef } from "react";
import { contact } from "@/lib/content";

/**
 * Trois moyens de contact directs, comme sur michelruiz.fr :
 * WhatsApp, téléphone (fenêtre avec le numéro et un bouton « Appeler ») et e-mail.
 */
export default function ContactActions() {
  const dialog = useRef<HTMLDialogElement>(null);
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
  const mail = `mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`;

  return (
    <>
      <div className="contact-actions">
        <a className="contact-action" href={wa} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 8 19.6L3 21z" />
            <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-.9.8a4 4 0 0 1-2.3-2.3l.8-.9-1-1.9L9 9.5z" />
          </svg>
          <span>WhatsApp</span>
        </a>
        <button className="contact-action" type="button" onClick={() => dialog.current?.showModal()}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
          </svg>
          <span>Téléphone</span>
        </button>
        <a className="contact-action" href={mail}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <span>E-mail</span>
        </a>
      </div>

      <dialog
        ref={dialog}
        className="phone-dialog"
        aria-labelledby="phone-dialog-title"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
      >
        <div className="phone-dialog__inner">
          <button className="phone-dialog__close" type="button" aria-label="Fermer" onClick={() => dialog.current?.close()}>
            ×
          </button>
          <h3 id="phone-dialog-title">Me contacter par téléphone</h3>
          <p>Vous pouvez me joindre directement au numéro ci-dessous.</p>
          <p className="phone-dialog__number">{contact.phone}</p>
          <a className="btn btn--primary" href={`tel:${contact.phoneIntl}`}>
            Appeler
          </a>
        </div>
      </dialog>
    </>
  );
}
