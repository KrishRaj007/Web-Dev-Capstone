# Expense Tracker Deployment Guide

This project is a Vite + React app. Deployment is a static build from the `dist/` folder created by `npm run build`.

## Prerequisites

- Node.js LTS installed (18.x or 20.x recommended).
- A GitHub repo for the project if you want GitHub-based deployments.

## Local production build (verify before deploy)

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a production build:

   ```bash
   npm run build
   ```

3. Preview the production build locally:

   ```bash
   npm run preview
   ```

The output is in `dist/`. This folder is what you deploy to static hosting.

## Option 1: Vercel (recommended for React/Vite)

1. Push the repo to GitHub.
2. Go to https://vercel.com and import the repo.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

## Option 2: Netlify

1. Push the repo to GitHub.
2. Go to https://app.netlify.com and create a new site from Git.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Deploy.

## Option 3: GitHub Pages

GitHub Pages needs a base path. Update Vite config before deploying.

### A) One-time config change

Update `vite.config.js` to set the base path to your repo name:

```js
export default defineConfig({
  base: "/YOUR_REPO_NAME/",
  plugins: [react()],
})
```

### B) Deploy with a `gh-pages` branch

1. Install the deploy helper:

   ```bash
   npm install --save-dev gh-pages
   ```

2. Add scripts to `package.json`:

   ```json
   {
     "scripts": {
       "build": "vite build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Build and deploy:

   ```bash
   npm run build
   npm run deploy
   ```

4. In GitHub repo settings, enable **Pages** and select the `gh-pages` branch.

## Option 4: Cloudflare Pages

1. Push the repo to GitHub.
2. Go to https://pages.cloudflare.com and create a new project from Git.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy.

## Common pitfalls

- If assets load as 404 on GitHub Pages, check the `base` value in `vite.config.js`.
- If your build fails, run `npm install` and confirm Node.js LTS is installed.
- Only deploy the `dist/` folder, not the source files.

## Optional: Single-command deployment checklist

```bash
npm install
npm run build
npm run preview
```

If preview works, the `dist/` folder is ready for hosting.
