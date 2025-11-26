# 2048 Base Edition

A Farcaster Mini App version of the classic 2048 game, themed for Base.

## Overview
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **State**: React Hooks + LocalStorage
- **Integration**: Farcaster Mini App SDK
- **PWA**: Fully offline-capable

## How to run locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## How to deploy on Vercel

1. Push this repository to GitHub.
2. Connect the repository to Vercel.
3. Deploy.

## How to publish as Farcaster Mini App

1. Use your deployed URL (e.g., `https://2048-base.vercel.app/`) as the **Home URL**.
2. Use `/icon.png` as the **Icon**.
3. Ensure `.well-known/farcaster.json` is accessible at `https://2048-base.vercel.app/.well-known/farcaster.json`.
   - **Note**: You may need to update the domain in `public/.well-known/farcaster.json` if your domain is different.

## Troubleshooting

- **Splash never hides**: Check console for SDK errors. Ensure `sdk.actions.ready()` is called.
- **Blank screen**: Clear site data and unregister service workers.
