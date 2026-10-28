import Link from "next/link";
import { contact, nav, site } from "@/lib/content";
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
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phoneIntl}`}>{contact.phone}</a>
            </li>
            <li>
              <a href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.emailSubject)}`}>E-mail</a>
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
            <a href={site.legalUrl}>Mentions légales</a>
          </li>
          <li>
            <a href={site.personalUrl}>michelruiz.fr</a>
          </li>
        </ul>
        <p className="site-footer__host">
          {site.legalName} est une activité de {site.founder}. Site hébergé par {site.host}.
        </p>
      </div>
    </footer>
  );
}
