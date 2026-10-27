# MR Consulting — site web

Site de la société de conseil MR Consulting (distinct de michelruiz.fr, site personnel conférencier).
Expérience en *story scrolling* : un champ de particules raconte le passage **de la complexité à la clarté**
au fil des sections (chaos → sphère → trajectoire → grille d’audit → réseau IA → monogramme « MR » → galaxie → horizon).

## Stack

| Brique | Choix | Pourquoi |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, TypeScript) | Pages pré-rendues statiquement (SEO, Core Web Vitals), route API pour le formulaire |
| Animations | GSAP 3 + ScrollTrigger + SplitText | Standard des grandes agences, robuste, gratuit depuis 2025 |
| Défilement | Lenis | Scroll inertiel synchronisé avec ScrollTrigger |
| Visuel narratif | Canvas 2D maison (`components/StoryCanvas.tsx`) | Effet « 3D » (perspective, rotation) sans le poids de Three.js ; mis en pause hors écran |
| E-mails | Resend (API HTTP, sans dépendance) | Notification + accusé de réception |
| Analytics | Plausible (optionnel) | Sans cookie → pas de bandeau de consentement requis |

## Démarrer

```bash
npm install
cp .env.example .env.local   # puis compléter
npm run dev                  # http://localhost:3000
npm run build && npm start   # version de production
npm run typecheck
```

## Variables d’environnement

Voir `.env.example`. Indispensables en production :

- `NEXT_PUBLIC_SITE_URL` — domaine définitif (SEO, sitemap, Open Graph).
- `RESEND_API_KEY` et `CONTACT_FROM` — **sans elles, le formulaire renvoie une erreur en production**
  (choix volontaire : ne jamais afficher « envoyé » si la demande est perdue). En développement, l’envoi est simulé.
- `CONTACT_TO` — destinataire des demandes (par défaut `NEXT_PUBLIC_CONTACT_EMAIL`).

Optionnelles : `NEXT_PUBLIC_BOOKING_URL` (bouton « Réserver un créneau »), `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.

## Mettre à jour les contenus (formation courte)

Tous les textes sont dans **`lib/content.ts`** — aucun autre fichier à toucher pour la copie.

- **Hero, « Qui sommes-nous », appel à l’action** : objets `hero`, `about`, `cta`.
- **Piliers** : tableau `pillars`. Chaque pilier alimente à la fois sa section sur l’accueil et sa page détaillée
  (`/accompagnement`, `/audit`, `/intelligence-artificielle`, `/ideation-creation`).
- **Témoignages / cas clients** : ajouter une entrée au tableau `testimonials` ;
  la section apparaît automatiquement sur l’accueil (elle est masquée tant que la liste est vide).
  ```ts
  { quote: "…", author: "Prénom Nom", role: "Directrice innovation", company: "Société" }
  ```
- **Mentions légales** : objet `legal` (SIRET, adresse, forme juridique… à compléter avant la mise en ligne).

Après modification : `git commit` + `git push` → redéploiement automatique (Vercel).

## Animations : comment ça marche

Les sections sont des composants serveur (contenu indexable, lisible sans JavaScript).
Les animations sont déclarées par attributs HTML et appliquées par `components/ScrollEffects.tsx` :

| Attribut | Effet |
| --- | --- |
| `data-formation="n"` | Formation de particules affichée quand la section est active |
| `data-canvas-x="0.72"` | Position horizontale du motif (desktop), à l’opposé du texte |
| `data-intro` / `data-intro="lines"` | Révélation au chargement |
| `data-split` | Titre révélé ligne par ligne |
| `data-reveal` / `data-reveal="stagger"` | Apparition au scroll (de l’élément ou de ses enfants) |
| `data-scrub-words` | Mots qui s’illuminent au fil du scroll |
| `data-parallax="0.3"` | Parallaxe |
| `data-counter="35"` | Compteur animé |
| `data-hscroll` + `data-hscroll-track` | Piste horizontale épinglée (desktop) |

Accessibilité : `prefers-reduced-motion` désactive Lenis, les révélations et la rotation des particules.
Mobile : moins de particules, densité de pixels plafonnée, piste horizontale remplacée par une liste verticale.

## Déploiement

Recommandé : **Vercel** (zéro configuration, route API incluse, HTTPS, CDN).
Renseigner les variables d’environnement dans le projet Vercel, puis rattacher le domaine.
En-têtes de sécurité (CSP, HSTS…) définis dans `next.config.ts`.

## Avant la mise en ligne — à fournir / valider

- Domaine définitif et adresse e-mail de contact.
- Informations légales (`legal` dans `lib/content.ts`).
- Compte Resend avec domaine expéditeur vérifié (SPF/DKIM).
- Validation de la section « Notre approche » (5 étapes proposées, non issues du cahier des charges).
- Témoignages ou cas clients avec accord écrit des personnes citées.
