# Portfolio Website

## Project

This project is my personal portfolio built in Next.js, designed to present my technical profile and real workspace projects for resume use.

## Problem

Static portfolios become outdated quickly and usually disconnect from real project work. I wanted a portfolio that stays aligned with the actual codebase.

## How I Solved It

- Built the site as modular sections (hero, about, skills, projects, contact, expertise).
- Added dictionary-based localization support via shared `@repo/i18n` packages.
- Implemented dynamic project discovery for the Projects section:
  - scans workspace app packages
  - applies curated metadata overrides
  - infers category and stack
- Added a dedicated expertise page and reusable layout/navigation components.
- Reused shared UI packages to keep styles/components consistent across the monorepo.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Mantine UI

## Run Locally

1. Install dependencies from the repo root:
   - `bun install`
2. Set root `.env`:
   - `PORT_PORTFOLIO`
3. Start app:
   - `bun run --filter=portfolio dev`
