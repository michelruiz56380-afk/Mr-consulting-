import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StoryCanvas from "@/components/StoryCanvas";
import ContactActions from "@/components/ContactActions";
import { cta, pillars } from "@/lib/content";

const FORMATION: Record<string, number> = {
  accompagnement: 2,
  audit: 3,
  "intelligence-artificielle": 4,
  "ideation-creation": 5,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return pillars.map((p) => ({ pilier: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pilier: string }> }): Promise<Metadata> {
  const { pilier } = await params;
  const p = pillars.find((x) => x.slug === pilier);
  if (!p) return {};
  return {
    title: p.detail.title,
    description: `${p.headline} ${p.intro}`,
    alternates: { canonical: `/${p.slug}` },
    openGraph: { title: `${p.detail.title} — MR Consulting`, description: p.detail.lead, url: `/${p.slug}` },
  };
}

export default async function PillarPage({ params }: { params: Promise<{ pilier: string }> }) {
  const { pilier } = await params;
  const idx = pillars.findIndex((x) => x.slug === pilier);
  if (idx < 0) notFound();
  const p = pillars[idx];
  const next = pillars[(idx + 1) % pillars.length];
  const formation = FORMATION[p.slug];

  return (
    <>
      <StoryCanvas initial={formation} />
      <div className="canvas-scrim canvas-scrim--strong" aria-hidden="true" />

      <section className="page-hero" data-formation={formation} data-canvas-x="0.75" aria-labelledby="page-title">
        <div className="container">
          <nav className="breadcrumb mono" aria-label="Fil d’Ariane" data-intro>
            <Link href="/">Accueil</Link> <span aria-hidden="true">/</span> <span aria-current="page">{p.name}</span>
          </nav>
          <p className="label mono" data-intro>
            <span className="label__num">{p.index}</span> {p.short}
          </p>
          <h1 id="page-title" className="display display--md" data-intro="lines">
            {p.detail.title}
          </h1>
          <p className="page-hero__lead" data-intro>
            {p.detail.lead}
          </p>
        </div>
      </section>

      <section className="detail container" data-formation={formation} aria-label="Ce que nous faisons">
        <ol className="detail__grid" data-reveal="stagger">
          {p.detail.blocks.map((b, i) => (
            <li key={b.title} className="detail__card">
              <span className="mono">0{i + 1}</span>
              <h2>{b.title}</h2>
              <p>{b.text}</p>
            </li>
          ))}
        </ol>

        <div className="detail__for">
          <h2 className="label mono" data-reveal>Pour qui</h2>
          <ul className="chips" data-reveal="stagger">
            {p.detail.forWho.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <p className="detail__signature" data-reveal>
            <em>{p.signature}</em>
          </p>
        </div>
      </section>

      <section className="page-cta container" data-formation={formation} aria-labelledby="page-cta-title">
        <div className="panel page-cta__panel" data-reveal>
          <h2 id="page-cta-title" className="h2">{cta.subtitle}</h2>
          <ContactActions />
          <div className="page-cta__next">
            <Link href={`/${next.slug}`} className="link-arrow">
              Expertise suivante : {next.name}
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
