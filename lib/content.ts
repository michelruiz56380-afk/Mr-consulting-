/**
 * Contenus éditoriaux du site MR Consulting.
 *
 * Toute la copie du site est centralisée ici : modifier ce fichier suffit
 * pour mettre à jour les textes, piliers, preuves ou témoignages.
 * Voir README.md > « Mettre à jour les contenus ».
 */

export const site = {
  name: "MR Consulting",
  legalName: "MR Consulting",
  // À remplacer par le domaine définitif (sans slash final).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mr-consulting.fr",
  tagline: "Cabinet de conseil indépendant",
  description:
    "MR Consulting accompagne les organisations pour rendre les technologies utiles, maîtrisées et créatrices de valeur — accompagnement, audit, intelligence artificielle, idéation et création.",
  email: "contact@michelruiz.fr",
  founder: "Michel Ruiz",
  // Mentions légales et politique de confidentialité : celles de michelruiz.fr.
  legalUrl: "https://michelruiz.fr/legal",
  personalUrl: "https://michelruiz.fr",
  // Hébergeur de ce site (obligation légale : il diffère de celui de michelruiz.fr).
  host: "Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, États-Unis",
};

/** Moyens de contact directs (boutons WhatsApp, Téléphone, E-mail). */
export const contact = {
  phone: "06 11 62 28 40",
  phoneIntl: "+33611622840",
  // Numéro au format international, sans « + » ni espaces.
  whatsapp: "33611622840",
  whatsappMessage: "Bonjour, je vous contacte depuis le site MR Consulting.",
  email: site.email,
  emailSubject: "Demande MR Consulting",
};

export const hero = {
  eyebrow: "MR Consulting — Cabinet de conseil indépendant",
  titleLines: ["Accompagnement, audit,", "IA et création :"],
  titleAccent: "nous rendons les technologies utiles et maîtrisées.",
  subtitle:
    "De l’idéation à la mise en œuvre, avec rigueur, pragmatisme et force de création.",
  ctaPrimary: "Parler de mon projet",
  ctaSecondary: "Demander un premier échange",
};

export const about = {
  label: "Qui est MR Consulting",
  lead: "MR Consulting est le cabinet de conseil de Michel Ruiz.",
  manifesto:
    "Nous accompagnons entreprises et organisations sur leurs enjeux d’innovation, d’intelligence artificielle, de qualité et de création. Indépendants, nous intervenons avec une double culture : la rigueur de l’audit et l’expérience concrète du terrain entrepreneurial.",
  conclusion: "Notre objectif est simple : des résultats clairs, utiles et durables.",
};

export type Pillar = {
  slug: string;
  index: string;
  name: string;
  short: string;
  headline: string;
  intro: string;
  points: string[];
  signature: string;
  /** Contenu de la page détaillée. */
  detail: {
    title: string;
    lead: string;
    blocks: { title: string; text: string }[];
    forWho: string[];
  };
};

export const pillars: Pillar[] = [
  {
    slug: "accompagnement",
    index: "01",
    name: "Accompagnement",
    short: "Stratégique & opérationnel",
    headline: "Nous vous accompagnons sur vos projets stratégiques et opérationnels.",
    intro:
      "Que vous soyez dirigeant, responsable de projet ou startup, nous vous aidons à avancer avec méthode et clarté.",
    points: [
      "Structuration",
      "Priorisation",
      "Choix technologiques",
      "Pilotage",
      "Montée en compétence",
    ],
    signature: "Avancer avec méthode et clarté.",
    detail: {
      title: "Accompagnement stratégique et opérationnel",
      lead: "Un interlocuteur unique pour structurer, décider et piloter vos projets — sans perdre de vue l’exécution.",
      blocks: [
        {
          title: "Structurer",
          text: "Clarifier les objectifs, cartographier l’existant, formaliser une feuille de route réaliste et partagée.",
        },
        {
          title: "Prioriser & choisir",
          text: "Arbitrer entre les options, sélectionner les technologies et les partenaires sans conflit d’intérêt produit.",
        },
        {
          title: "Piloter",
          text: "Mettre en place une gouvernance de projet légère, des indicateurs utiles et des points de décision clairs.",
        },
        {
          title: "Faire monter en compétence",
          text: "Transmettre les méthodes et les outils pour que vos équipes gagnent en autonomie durablement.",
        },
      ],
      forWho: ["Dirigeants de PME et ETI", "Responsables de projet", "Startups et scale-ups"],
    },
  },
  {
    slug: "audit",
    index: "02",
    name: "Audit",
    short: "Qualité, processus, IA & innovation",
    headline: "Nous réalisons des audits de processus, de dispositifs qualité ou de projets IA et innovation.",
    intro: "La rigueur au service de la décision.",
    points: [
      "Évaluation objective",
      "Identification des écarts",
      "Recommandations actionnables",
      "Plan d’amélioration",
    ],
    signature: "La rigueur au service de la décision.",
    detail: {
      title: "Audit qualité, processus, IA et innovation",
      lead: "Un regard indépendant et méthodique pour objectiver la situation et éclairer vos décisions.",
      blocks: [
        {
          title: "Évaluer objectivement",
          text: "Analyse documentaire, entretiens et observation terrain, sur la base de référentiels explicites.",
        },
        {
          title: "Identifier les écarts",
          text: "Mettre en évidence les points de non-conformité, les risques et les gisements de valeur.",
        },
        {
          title: "Recommander",
          text: "Des recommandations hiérarchisées, concrètes et actionnables — pas un rapport qui dort dans un tiroir.",
        },
        {
          title: "Planifier l’amélioration",
          text: "Un plan d’action priorisé, avec des responsabilités et des jalons de suivi.",
        },
      ],
      forWho: [
        "Dispositifs et systèmes qualité",
        "Processus métiers",
        "Projets IA et innovation",
      ],
    },
  },
  {
    slug: "intelligence-artificielle",
    index: "03",
    name: "Intelligence artificielle",
    short: "Utile, gouvernée, maîtrisée",
    headline: "Nous vous aidons à intégrer l’IA de façon utile et maîtrisée.",
    intro: "Pas d’IA pour l’IA : de la valeur concrète pour votre organisation.",
    points: [
      "Cas d’usage",
      "Agents conversationnels",
      "Automatisation raisonnée",
      "Gouvernance",
      "Maîtrise des risques",
    ],
    signature: "Pas d’IA pour l’IA.",
    detail: {
      title: "Intelligence artificielle utile et maîtrisée",
      lead: "Identifier où l’IA crée réellement de la valeur, la déployer progressivement et en garder la maîtrise.",
      blocks: [
        {
          title: "Identifier les cas d’usage",
          text: "Ateliers d’exploration, évaluation valeur / faisabilité / risque, sélection des cas prioritaires.",
        },
        {
          title: "Agents & automatisation",
          text: "Conception d’agents conversationnels et d’automatisations raisonnées, intégrés à vos processus réels.",
        },
        {
          title: "Gouvernance",
          text: "Règles d’usage, rôles, qualité des données, conformité réglementaire et suivi dans la durée.",
        },
        {
          title: "Maîtrise des risques",
          text: "Évaluation des risques (fiabilité, confidentialité, dépendance fournisseur) et mesures de contrôle adaptées.",
        },
      ],
      forWho: [
        "Directions générales et innovation",
        "Équipes métiers en quête de gains concrets",
        "Organisations soucieuses de conformité",
      ],
    },
  },
  {
    slug: "ideation-creation",
    index: "04",
    name: "Idéation & Création",
    short: "Marque, web, identité",
    headline: "Nous concevons et créons avec vous.",
    intro: "De l’idée à la réalisation, avec une exigence de cohérence et d’impact.",
    points: [
      "Matrice de marque",
      "Charte graphique",
      "Identité visuelle",
      "Création de pages web",
      "Storytelling",
      "Supports de communication",
    ],
    signature: "Cohérence et impact.",
    detail: {
      title: "Idéation, création et marketing",
      lead: "De la plateforme de marque aux supports concrets : une création cohérente, pensée pour l’impact.",
      blocks: [
        {
          title: "Matrice de marque",
          text: "Mission, valeurs, promesse, personnalité : poser les fondations qui guident toutes les expressions de la marque.",
        },
        {
          title: "Identité & charte graphique",
          text: "Identité visuelle, typographies, couleurs, règles d’usage — un système cohérent et facile à déployer.",
        },
        {
          title: "Pages web",
          text: "Conception et création de pages web modernes, performantes et orientées conversion. Ce site en est un exemple.",
        },
        {
          title: "Storytelling & supports",
          text: "Récit de marque, messages clés et supports de communication alignés sur vos objectifs.",
        },
      ],
      forWho: ["Startups en lancement", "Entreprises en repositionnement", "Projets d’innovation à valoriser"],
    },
  },
];

export const why = {
  label: "Pourquoi MR Consulting",
  title: "Indépendant, par conviction.",
  items: [
    { title: "Interlocuteur unique et indépendant", text: "Un seul point de contact, de la réflexion à la réalisation." },
    { title: "Vision transversale", text: "Stratégie, technologie, qualité et création réunies." },
    { title: "Aucun conflit d’intérêt produit", text: "Nos recommandations ne dépendent d’aucun éditeur ni revendeur." },
    { title: "Pédagogie", text: "Capacité à vulgariser et à embarquer les équipes." },
    { title: "Double culture", text: "Rigueur d’auditeur + expérience de création et d’entrepreneuriat." },
  ],
};

export const proofs = {
  label: "Preuves & approche",
  stat: { value: 35, suffix: "+", label: "ans d’expérience professionnelle" },
  items: [
    "Expertise en audit qualité et en pédagogie",
    "Expérience concrète de construction de solutions technologiques",
    "Capacité de création et de direction de projets",
  ],
  // Proposition de démarche — à valider par MR Consulting.
  approach: [
    { step: "01", title: "Comprendre", text: "Écouter, observer, cadrer le besoin réel et les contraintes." },
    { step: "02", title: "Évaluer", text: "Objectiver la situation avec la rigueur de l’audit." },
    { step: "03", title: "Concevoir", text: "Imaginer et prioriser les solutions, créer les livrables." },
    { step: "04", title: "Déployer", text: "Mettre en œuvre de façon progressive et maîtrisée." },
    { step: "05", title: "Transmettre", text: "Rendre vos équipes autonomes et pérenniser les résultats." },
  ],
};

/**
 * Témoignages / cas clients. Ajouter une entrée suffit à afficher la section
 * sur la page d’accueil (elle reste masquée tant que la liste est vide).
 */
export type Testimonial = { quote: string; author: string; role: string; company?: string };
export const testimonials: Testimonial[] = [];

export const cta = {
  label: "Parlons-en",
  title: "Vous avez un projet d’accompagnement, un besoin d’audit, une question d’IA ou un chantier de création ?",
  subtitle: "Parlons-en. Premier échange sans engagement.",
  button: "Demander un premier échange",
};

export const nav = [
  { href: "/accompagnement", label: "Accompagnement" },
  { href: "/audit", label: "Audit" },
  { href: "/intelligence-artificielle", label: "IA" },
  { href: "/ideation-creation", label: "Création" },
];
