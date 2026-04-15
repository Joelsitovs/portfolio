# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

**Porfolio** is an Angular 21 portfolio application with a modular feature-based architecture. It uses Tailwind CSS for styling, Vitest for testing, and Bun as the package manager.

## Technology Stack

- **Framework**: Angular 21 (standalone components)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1 + PostCSS
- **Testing**: Vitest 4.0 + jsdom
- **Package Manager**: Bun 1.3.6
- **Email Service**: EmailJS
- **Deployment**: Firebase

## Common Commands

| Command | Purpose |
|---------|---------|
| `bun install` | Install dependencies |
| `bun start` | Start development server (http://localhost:4200) |
| `bun build` | Build for production |
| `bun watch` | Build in watch mode for development |
| `bun test` | Run unit tests with Vitest |

## Project Architecture

### Directory Structure

```
src/app/
├── core/                    # Shared services and utilities
│   ├── services/           # NavigationService
│   └── i18n/              # Translation service and pipe
├── features/              # Feature modules (standalone components)
│   ├── home/             # Landing page
│   ├── about/            # About section
│   ├── contact/          # Contact form (uses EmailJS)
│   ├── experience/       # Work experience
│   ├── projects/         # Portfolio projects
│   └── skills/           # Skills section
├── layout/               # Layout components
│   └── header/          # Navigation header
├── app.ts               # Root component
├── app.config.ts        # Application configuration
├── app.routes.ts        # Route definitions
├── styles.css           # Global styles
└── index.html           # Entry point
```

### Architecture Patterns

- **Standalone Components**: All components use Angular's standalone API (`@angular/core` standalone flag)
- **Feature-Based Organization**: Each feature (home, about, contact, etc.) is self-contained with its own component, template, and tests
- **Core Services**: Centralized services in `src/app/core/` for application-wide concerns (i18n, navigation)
- **Translation Pipe**: `TranslatePipe` available globally for i18n support

## Testing

### Unit Tests
- Run all tests: `bun test`
- Test files use `.spec.ts` extension (e.g., `about.spec.ts`)
- Framework: Vitest with jsdom for DOM simulation
- Tests are colocated with components (e.g., `about/about.spec.ts` next to `about/about.ts`)

## Configuration Files

- **angular.json**: Angular CLI build configuration (prefix: `app`)
- **tsconfig.json**: TypeScript compiler options with strict mode enabled
  - Path alias: `@/*` maps to `src/*`
- **firebase.json**: Firebase deployment configuration
- **tailwind.config.js**: Tailwind CSS customization (if present)

## Important Constraints & Preferences

### Build Configuration
- Production bundle budget: 500kB initial (error at 1MB)
- Per-component style budget: 4kB warning, 8kB error
- Output hashing enabled in production builds

### TypeScript
- Strict mode enabled (`"strict": true`)
- Property access from index signatures forbidden
- Implicit returns forbidden
- No fall-through switch cases allowed
- Angular compiler: strict templates enabled

### Prettier Formatting
- Print width: 100 characters
- Single quotes
- HTML files parsed as "angular"

## Development Notes

- **Routing**: Routes are defined in `app.routes.ts` (currently empty in initial commit)
- **Error Handling**: Global error listeners configured in `app.config.ts`
- **Dependencies**: Keep dependencies minimal; review `package.json` before adding new packages
- **i18n**: Translation service available in core—use `TranslatePipe` in templates or inject `TranslationService` in components
- **EmailJS**: Already integrated for contact forms—service ID and credentials configured in environment

## Firebase Deployment

The project is configured for Firebase hosting. Deploy with:
```bash
firebase deploy
```
Ensure Firebase CLI is installed and authenticated.
