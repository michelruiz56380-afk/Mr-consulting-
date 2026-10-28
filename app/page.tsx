import Link from "next/link";
import StoryCanvas from "@/components/StoryCanvas";
import { about, cta, hero, pillars, proofs, site, testimonials, why } from "@/lib/content";

// Formation de particules associée à chaque pilier (voir StoryCanvas).
const PILLAR_FORMATION = [2, 3, 4, 5];

export default function Home() {
  return (
    <>
      <StoryCanvas />
      <div className="canvas-scrim" aria-hidden="true" />

      {/* 1 — Hero */}
      <section className="hero" data-formation="0" data-canvas-x="0.72" aria-labelledby="hero-title">
        <div className="container hero__inner" data-fade-out>
          <p className="eyebrow mono" data-intro>
            <span className="dot" aria-hidden="true" /> {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="display" data-intro="lines">
            {hero.titleLines.join(" ")} <em>{hero.titleAccent}</em>
          </h1>
          <p className="hero__subtitle" data-intro>
            {hero.subtitle}
          </p>
          <div className="hero__ctas" data-intro>
            <a href={site.contactUrl} className="btn btn--primary">
              {hero.ctaPrimary}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <Link href="#contact" className="btn btn--ghost">
              {hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <a href="#qui" className="scroll-cue mono" aria-label="Découvrir MR Consulting">
          <span>Scroll</span>
          <span className="scroll-cue__line" aria-hidden="true" />
        </a>
      </section>

      {/* 2 — Qui est MR Consulting */}
      <section id="qui" className="about" data-formation="1" data-canvas-x="0.74" data-scrub-scope aria-labelledby="about-title">
        <div className="about__sticky container">
          <p className="label mono" data-reveal>
            <span className="label__num">00</span> {about.label}
          </p>
          <h2 id="about-title" className="about__lead" data-split>
            {about.lead}
          </h2>
          <p className="about__manifesto" data-scrub-words>
            {about.manifesto}
          </p>
          <p className="about__conclusion" data-reveal>
            {about.conclusion}
          </p>
        </div>
      </section>

      {/* 3 → 6 — Piliers */}
      <div className="pillars-intro container" data-formation="1" data-canvas-x="0.74">
        <p className="label mono" data-reveal>Quatre expertises, une même exigence</p>
        <ol className="pillars-index" data-reveal="stagger">
          {pillars.map((p) => (
            <li key={p.slug}>
              <a href={`#${p.slug}`}>
                <span className="mono">{p.index}</span> {p.name}
              </a>
            </li>
          ))}
        </ol>
      </div>

      {pillars.map((p, i) => (
        <section
          key={p.slug}
          id={p.slug}
          className={`pillar${i % 2 ? " pillar--right" : ""}`}
          data-formation={PILLAR_FORMATION[i]}
          data-canvas-x={i % 2 ? 0.28 : 0.72}
          aria-labelledby={`${p.slug}-title`}
        >
          <div className="container pillar__inner">
            <div className="pillar__num" aria-hidden="true" data-parallax="0.35">
              {p.index}
            </div>
            <div className="pillar__content">
              <p className="label mono" data-reveal>
                <span className="label__num">{p.index}</span> {p.name} · {p.short}
              </p>
              <h2 id={`${p.slug}-title`} className="h2" data-split>
                {p.headline}
              </h2>
              <p className="pillar__intro" data-reveal>
                {p.intro}
              </p>
              <ul className="chips" data-reveal="stagger">
                {p.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
              <Link href={`/${p.slug}`} className="link-arrow" data-reveal>
                Découvrir l’offre {p.name.toLowerCase()}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      ))}

      {/* 7 — Pourquoi MR Consulting */}
      <section className="why" data-formation="6" data-canvas-x="0.7" aria-labelledby="why-title">
        <div className="container">
          <p className="label mono" data-reveal>
            <span className="label__num">05</span> {why.label}
          </p>
          <h2 id="why-title" className="display display--md" data-split>
            {why.title}
          </h2>
          <ol className="why__list" data-reveal="stagger">
            {why.items.map((item, i) => (
              <li key={item.title}>
                <span className="mono why__n">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8 — Preuves & approche */}
      <section className="proofs" data-formation="6" aria-labelledby="proofs-title">
        <div className="container proofs__grid">
          <div>
            <p className="label mono" data-reveal>
              <span className="label__num">06</span> {proofs.label}
            </p>
            <h2 id="proofs-title" className="visually-hidden">
              Preuves d’expérience
            </h2>
            <p className="stat" aria-label={`${proofs.stat.value}${proofs.stat.suffix} ${proofs.stat.label}`}>
              <span className="stat__value" aria-hidden="true">
                <span data-counter={proofs.stat.value}>{proofs.stat.value}</span>
                {proofs.stat.suffix}
              </span>
              <span className="stat__label" aria-hidden="true">{proofs.stat.label}</span>
            </p>
          </div>
          <ul className="proofs__list" data-reveal="stagger">
            {proofs.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="approach" data-formation="6" data-hscroll aria-labelledby="approach-title">
        <div className="approach__head container">
          <p className="label mono">Notre approche</p>
          <h2 id="approach-title" className="h2">
            De la complexité à la <em>clarté</em>, en cinq temps.
          </h2>
        </div>
        <ol className="approach__track" data-hscroll-track>
          {proofs.approach.map((s) => (
            <li key={s.step} className="approach__card">
              <span className="mono approach__step">{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {testimonials.length > 0 ? (
        <section className="testimonials container" data-formation="6" aria-labelledby="testimonials-title">
          <h2 id="testimonials-title" className="label mono">Ils nous ont fait confiance</h2>
          <div className="testimonials__grid" data-reveal="stagger">
            {testimonials.map((t) => (
              <figure key={t.author}>
                <blockquote>« {t.quote} »</blockquote>
                <figcaption>
                  <strong>{t.author}</strong> — {t.role}
                  {t.company ? `, ${t.company}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {/* 9 — Appel à l'action + contact */}
      <section id="contact" className="cta" data-formation="7" data-canvas-x="0.5" aria-labelledby="cta-title">
        <div className="container cta__grid">
          <div>
            <p className="label mono" data-reveal>
              <span className="label__num">07</span> {cta.label}
            </p>
            <h2 id="cta-title" className="h2" data-split>
              {cta.title}
            </h2>
            <p className="cta__subtitle" data-reveal>
              <em>{cta.subtitle}</em>
            </p>
          </div>
          <div className="panel cta__panel" data-reveal>
            <p className="mono cta__panel-label">Premier échange sans engagement</p>
            <p className="cta__panel-text">
              Décrivez votre besoin en quelques lignes : accompagnement, audit, intelligence artificielle ou création.
              Réponse sous 48 h ouvrées.
            </p>
            <a href={site.contactUrl} className="btn btn--primary">
              {cta.button}
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <p className="cta__panel-mail">
              Ou par e-mail : <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
