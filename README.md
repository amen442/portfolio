# Portfolio — Amen Allah Ibrahmi

Portfolio one-page moderne et animé : React 18, Vite, TypeScript (strict), Tailwind CSS 3, Framer Motion, React Hook Form + Zod.

## Démarrage

```bash
npm install
npm run dev        # serveur de dev → http://localhost:5173
npm run build      # typecheck + build de production dans /dist
npm run preview    # prévisualiser le build
```

## À remplacer par tes fichiers

| Fichier                  | Rôle                                         |
| ------------------------ | -------------------------------------------- |
| `public/CV_Amen_Allah_Ibrahmi.pdf` | Ton CV (boutons « Télécharger mon CV » / CV) |
| `src/assets/profile.jpg` | Ta photo de profil (carrée, ≥ 640×640)       |
| `public/og-image.svg`    | Image de partage Open Graph (optionnel)      |

## Modifier le contenu

Tout le contenu (profil, expériences, projets, compétences, certifications, langues, liens sociaux) est dans
**`src/data/profile.ts`**. Les composants n'ont rien en dur.

- Liens GitHub / LinkedIn : renseigne `href` dans `profile.socials`.
- Liens projets : ajoute un `link: { label, href }` à un projet pour afficher le bouton « Voir le projet ».

## Formulaire de contact

Sans configuration, l'envoi est **simulé**. Pour recevoir de vrais messages, crée un endpoint (ex. Formspree)
et définis-le dans un fichier `.env` :

```
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Le formulaire fait un `POST` JSON `{ name, email, message }` vers cette URL.

## Structure

```
src/
  components/   Navbar, ThemeToggle, Reveal, TiltCard, Counter, SectionHeading
  sections/     Hero, About, Experience, Projects, Skills, Leadership, Certifications, Languages, Contact, Footer
  data/         profile.ts (toutes les données)
  hooks/        useTheme, useActiveSection, useTypewriter
  lib/          motion.ts (variants, easing), icons.ts
  assets/       profile.jpg
```

## Design & accessibilité

- Thème clair/sombre persisté (`localStorage`), appliqué avant le premier rendu (pas de flash).
- Couleurs via variables CSS (`src/index.css`) exposées dans `tailwind.config.ts`.
- `prefers-reduced-motion` respecté (Framer Motion `MotionConfig` + media query CSS + typewriter désactivé).
- Navigation clavier, focus visibles, lien d'évitement, `aria-label` sur les boutons icônes.
