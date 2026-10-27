import type { Metadata } from "next";
import { legal, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  const analytics = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);
  return (
    <article className="legal container">
      <h1 className="display display--sm">Politique de confidentialité</h1>
      <p className="mono legal__updated">Dernière mise à jour : {legal.updated}</p>

      <h2>Responsable du traitement</h2>
      <p>
        {site.legalName} — {legal.address} — <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Données collectées via le formulaire de contact</h2>
      <p>
        Nom, adresse e-mail, organisation (facultatif), nature du besoin et message. Ces données sont transmises par
        e-mail à {site.legalName} ; le site lui-même ne les enregistre dans aucune base de données.
      </p>
      <ul>
        <li>
          <strong>Finalité :</strong> répondre à votre demande et, le cas échéant, préparer une proposition.
        </li>
        <li>
          <strong>Base légale :</strong> votre consentement (case à cocher) et les mesures précontractuelles prises à votre
          demande (art. 6.1.a et 6.1.b du RGPD).
        </li>
        <li>
          <strong>Durée de conservation :</strong> 3 ans à compter du dernier contact, sauf relation contractuelle.
        </li>
        <li>
          <strong>Destinataires :</strong> {site.legalName} uniquement. Sous-traitants techniques : Resend (acheminement des
          e-mails) et {legal.host.name} (hébergement), encadrés par des clauses contractuelles types pour les
          transferts hors Union européenne.
        </li>
      </ul>

      <h2>Mesure d’audience</h2>
      {analytics ? (
        <p>
          Ce site utilise Plausible Analytics, un outil de mesure d’audience respectueux de la vie privée : aucun cookie,
          aucune donnée personnelle collectée, adresses IP non conservées, données hébergées dans l’Union européenne. Cet
          usage est exempté de consentement au sens des lignes directrices de la CNIL.
        </p>
      ) : (
        <p>Ce site n’utilise actuellement aucun outil de mesure d’audience.</p>
      )}

      <h2>Cookies</h2>
      <p>Ce site ne dépose aucun cookie publicitaire ni de traçage.</p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité
        de vos données, ainsi que du droit de retirer votre consentement à tout moment. Pour les exercer :{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également introduire une réclamation auprès de la
        CNIL (<a href="https://www.cnil.fr">www.cnil.fr</a>).
      </p>
    </article>
  );
}
