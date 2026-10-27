import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import StoryCanvas from "@/components/StoryCanvas";
import { cta, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — premier échange sans engagement",
  description: "Accompagnement, audit, IA ou création : parlons de votre projet. Premier échange sans engagement avec MR Consulting.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <StoryCanvas initial={7} />
      <div className="canvas-scrim canvas-scrim--strong" aria-hidden="true" />
      <section className="page-hero page-hero--contact" data-formation="7" aria-labelledby="page-title">
        <div className="container contact-page">
          <div>
            <p className="label mono" data-intro>Contact</p>
            <h1 id="page-title" className="display display--md" data-intro="lines">
              Parlons de votre <em>projet.</em>
            </h1>
            <p className="page-hero__lead" data-intro>
              {cta.title} {cta.subtitle}
            </p>
            <dl className="contact-meta" data-intro>
              <div>
                <dt className="mono">E-mail</dt>
                <dd>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div>
                <dt className="mono">Délai de réponse</dt>
                <dd>Sous 48 h ouvrées</dd>
              </div>
            </dl>
          </div>
          <div className="panel" data-intro>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
