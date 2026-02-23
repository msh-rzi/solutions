# Portfolio Website

Next.js portfolio app that renders modular profile sections and reads project inventory directly from the monorepo.

## Problem Addressed in This Codebase

The portfolio includes a projects section that is generated from workspace files instead of being hardcoded.

## What Exists in the Code

- Home page sections are composed in `app/features/home/HomePage.tsx`:
  - Header
  - Hero
  - About
  - Skills
  - Projects
  - Contact
  - Footer
- Expertise page exists at `app/expertise/page.tsx`.
- Localization:
  - dictionary utilities from `@repo/i18n`
  - portfolio dictionaries for English, Persian, and German
- Project inventory generation in `app/components/sections/projects/projectInventory.ts`:
  - scans `apps` directories from resolved workspace root
  - skips `.next`, `.turbo`, `dist`, `node_modules`
  - reads each `package.json`
  - applies project metadata overrides for key apps
  - infers stack labels from dependencies
  - builds app links from env-based port mapping
  - sorts by configured order/category/title
- Projects section server component (`Projects.tsx`) renders cards from `getWorkspaceProjects()` and links when `appUrl` exists.
- Shared monorepo packages are used for UI and i18n.

## Potential Improvements

- Add tests for project inventory scanning and locale dictionary integrity.
- Add caching or build-time generation if filesystem scanning cost grows.
- Add content/source validation in CI to catch stale overrides automatically.
- Add fallback strategy for environments where runtime filesystem scanning is restricted.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- `@repo/ui-shadcn`
- `@repo/ui-mantine`
- `@repo/i18n`
- Bun

## Run Locally

1. From repo root: `bun install`
2. Create `apps/_3-Portfolio/.env` from `apps/_3-Portfolio/.env.example` and configure:
   - `PORT_PORTFOLIO`
3. Start app:
   - `bun run --filter=portfolio dev`
