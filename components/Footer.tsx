import Link from "next/link";
import { nav, site } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <Link href="/" className="brand" aria-label="MR Consulting — accueil">
            <Logo />
            <span className="brand__name">
              MR <span>Consulting</span>
            </span>
          </Link>
          <p className="site-footer__tag">
            {site.tagline}. Accompagnement, audit, intelligence artificielle, idéation & création.
          </p>
        </div>
        <nav aria-label="Expertises">
          <p className="mono label">Expertises</p>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label === "IA" ? "Intelligence artificielle" : item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mono label">Contact</p>
          <ul>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={site.contactUrl}>Formulaire de contact</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {site.legalName}
        </p>
        <ul>
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link href="/confidentialite">Politique de confidentialité</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
