# L'Artisan Moderne - Boulangerie Haut de Gamme

Un site web futuriste pour une boulangerie artisanale haut de gamme, créé avec Next.js et MongoDB.

## Concept

Le site est basé sur un design minimaliste et élégant inspiré d'Apple, avec un fond noir et des accents dorés. La caractéristique principale est une expérience de défilement interactive où une baguette de pain haute résolution apparaît progressivement en fondu au fur et à mesure que l'utilisateur défile vers le bas, accompagnée d'effets visuels élégants. En continuant de défiler, une image d'intérieur de boulangerie apparaît en arrière-plan avec un effet de flou, dévoilant des informations sur l'établissement.

## Fonctionnalités

- Design futuriste et épuré inspiré d'Apple
- En-tête réactive qui change d'apparence lors du défilement
- Animation de défilement avec apparition progressive de la baguette en fondu
- Effets visuels élégants sur les images (masque, échelle, luminosité, flou)
- Transition entre différentes sections avec des images d'arrière-plan
- Sections d'information qui apparaissent au fur et à mesure du défilement
- Interface entièrement responsive

## Technologies utilisées

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- MongoDB (à implémenter)

## Installation

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Lancez le serveur de développement avec `npm run dev`
4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## Images

Pour que le site fonctionne correctement, vous devez ajouter deux images haute résolution dans le dossier `public/images/`:

- `baguette.jpg` - Une image d'une baguette artisanale sur fond noir
- `boulangerie.jpg` - Une image de l'intérieur d'une boulangerie artisanale

Consultez le fichier README.md dans le dossier `public/images/` pour plus de détails sur les spécifications recommandées.

## Développement

Ce projet est en cours de développement. Les prochaines étapes incluent:

- Intégration de MongoDB pour la gestion des produits
- Ajout d'une section e-commerce
- Implémentation d'une galerie de produits
- Création d'un système de réservation

## Licence

Ce projet est sous licence MIT.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
