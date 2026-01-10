# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a Next.js 14 personal website using the App Router with TypeScript and CSS Modules.

### Multi-App System

The site hosts multiple small applications under dynamic routes (`yoonshik.com/{appname}`). The app system has two registry files that must stay in sync:

- `app/[appname]/appsRegistry.ts` - Server-side registry with component imports (used by page.tsx for rendering)
- `app/[appname]/appsMetadata.ts` - Client-safe metadata without component imports (used by client components like PlaygroundDrawer)

App components live in `app/[appname]/apps/` and must be client components (`'use client'`).

### Adding a New App

1. Create component in `app/[appname]/apps/NewApp.tsx` with `'use client'` directive
2. Add entry to both `appsRegistry.ts` and `appsMetadata.ts`
3. Add navigation link in `components/Navigation.tsx` if needed

### Layout Structure

Root layout (`app/layout.tsx`) wraps all pages with:
- Navigation component
- Footer component
- PlaygroundDrawer (slide-out panel for app list)
- PlaygroundDrawerProvider context

### Styling

Uses CSS Modules (`.module.css` files co-located with components). Global styles in `app/globals.css`.
