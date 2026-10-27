import type { Metadata } from "next";
import { legal, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: true, follow: true },
};

export default function MentionsLegales() {
  return (
    <article className="legal container">
      <h1 className="display display--sm">Mentions légales</h1>
      <p className="mono legal__updated">Dernière mise à jour : {legal.updated}</p>

      <h2>Éditeur du site</h2>
      <p>
        {site.legalName}, {legal.form} au capital de {legal.capital}
        <br />
        Siège social : {legal.address}
        <br />
        SIRET : {legal.siret} — {legal.rcs}
        <br />
        TVA intracommunautaire : {legal.vat}
        <br />
        Contact : <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Directeur de la publication</h2>
      <p>{legal.publisher}</p>

      <h2>Hébergement</h2>
      <p>
        {legal.host.name} — {legal.host.address} — <a href={legal.host.url}>{legal.host.url}</a>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L’ensemble des contenus de ce site (textes, éléments graphiques, logo, animations, code) est la propriété de{" "}
        {site.legalName}, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans
        autorisation écrite préalable est interdite.
      </p>

      <h2>Distinction avec michelruiz.fr</h2>
      <p>
        Le présent site est celui de la société {site.legalName}. Il est distinct du site personnel de Michel Ruiz
        consacré à son activité de conférencier.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {site.legalName} s’efforce d’assurer l’exactitude des informations diffusées sur ce site, sans pouvoir en
        garantir l’exhaustivité. Les informations présentées ne constituent pas un engagement contractuel.
      </p>
    </article>
  );
}
