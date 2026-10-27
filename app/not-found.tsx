import Link from "next/link";

export default function NotFound() {
  return (
    <section className="legal container" style={{ minHeight: "70vh" }}>
      <p className="label mono">Erreur 404</p>
      <h1 className="display display--sm">
        Cette page s’est perdue dans le <em>chaos.</em>
      </h1>
      <p>
        <Link href="/" className="link-arrow">
          Retrouver la clarté — retour à l’accueil <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}
