# Cooperative Gig Services

A modern landing page for a community-powered gig platform connecting local workers with businesses.

## Local development

1. Install dependencies:
   npm install
2. Start the Vite dev server:
   npm run dev
3. Open the local URL shown in the terminal (usually http://localhost:5173)

## Production build

Run:

npm run build

This creates a production bundle in the `dist` folder.

## Deployment options

### GitHub Pages

1. Install the GitHub Pages package:
   npm install -D gh-pages
2. Add this script to `package.json`:
   "deploy": "vite build && gh-pages -d dist"
3. Run:
   npm run deploy

### Netlify

1. Push the project to GitHub.
2. In Netlify, choose "Add new site" → "Import an existing project".
3. Set the build command to:
   npm run build
4. Set the publish directory to:
   dist

## Project structure

- `src/App.jsx` – main landing page layout
- `src/App.css` – page styling
- `src/index.css` – global styles and resets
- `vite.config.js` – Vite config with a relative base path for deployability
