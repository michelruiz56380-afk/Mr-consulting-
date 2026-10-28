# MR Consulting — site web

Site de la société de conseil MR Consulting (distinct de michelruiz.fr, site personnel conférencier).
Expérience en *story scrolling* : un champ de particules raconte le passage **de la complexité à la clarté**
au fil des sections (chaos → sphère → trajectoire → grille d’audit → réseau IA → monogramme « MR » → galaxie → horizon).

## Stack

| Brique | Choix | Pourquoi |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, TypeScript) | Pages pré-rendues statiquement (SEO, Core Web Vitals), aucun serveur ni base de données |
| Animations | GSAP 3 + ScrollTrigger + SplitText | Standard des grandes agences, robuste, gratuit depuis 2025 |
| Défilement | Lenis | Scroll inertiel synchronisé avec ScrollTrigger |
| Visuel narratif | Canvas 2D maison (`components/StoryCanvas.tsx`) | Effet « 3D » (perspective, rotation) sans le poids de Three.js ; mis en pause hors écran |
| Contact | Boutons WhatsApp, Téléphone, E-mail | Comme sur michelruiz.fr : contact direct, aucun formulaire ni donnée collectée |
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

Voir `.env.example`. Aucune n’est obligatoire pour que le site fonctionne ; à renseigner pour la production :

- `NEXT_PUBLIC_SITE_URL` — domaine définitif (SEO, sitemap, Open Graph).
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — mesure d’audience (optionnelle).

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
- **Contact** : objet `contact` (numéro de téléphone, WhatsApp, e-mail, message pré-rempli).
- **Mentions légales** : le pied de page renvoie vers https://michelruiz.fr/legal (`site.legalUrl`) ; les anciennes adresses `/mentions-legales` et `/confidentialite` y redirigent.

Après modification : `git commit` + `git push` → redéploiement automatique (Netlify).

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

## Déploiement (Netlify)

1. Sur https://app.netlify.com : **Add new site → Import an existing project → GitHub**, choisir le dépôt `Mr-consulting-`.
2. Branche à déployer : `claude/mr-consulting-site`. Les réglages de build sont lus dans `netlify.toml` (rien à saisir).
3. **Site configuration → Environment variables** : ajouter les variables de `.env.example`
   (au minimum `NEXT_PUBLIC_SITE_URL`), puis relancer un déploiement.
4. **Domain management** : rattacher le domaine définitif (HTTPS automatique).

Chaque `git push` sur la branche redéploie le site. En-têtes de sécurité (CSP, HSTS…) définis dans `next.config.ts`.

## Avant la mise en ligne — à fournir / valider

- Domaine définitif et adresse e-mail de contact.
- Validation de la section « Notre approche » (5 étapes proposées, non issues du cahier des charges).
- Témoignages ou cas clients avec accord écrit des personnes citées.
