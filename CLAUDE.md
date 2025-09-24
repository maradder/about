# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production version
- `npm run preview` - Preview production build
- `npm run check` - Type check with svelte-check
- `npm run check:watch` - Type check in watch mode
- `npm run lint` - Check formatting and linting (prettier + eslint)
- `npm run format` - Format code with prettier
- `npm test` - Run all tests (unit + e2e)
- `npm run test:unit` - Run Vitest unit tests
- `npm run test:e2e` - Run Playwright e2e tests
- `npm run storybook` - Start Storybook dev server on port 6006
- `npm run build-storybook` - Build Storybook for production

## Architecture

This is a SvelteKit portfolio application with the following stack:

- **Framework**: SvelteKit with TypeScript
- **Styling**: Tailwind CSS v4 with forms and typography plugins
- **Testing**: Vitest for unit tests (browser environment with Playwright), Playwright for e2e tests
- **Documentation**: Storybook with accessibility, docs, and Vitest addons
- **Content**: MDSvex for Markdown components (`.svx` files supported)
- **Linting**: ESLint with TypeScript, Svelte, and Storybook plugins
- **Formatting**: Prettier with Svelte and Tailwind plugins

### Key Configuration

- Vitest runs in browser environment using Playwright for component tests
- Separate test projects for client (browser) and server (node) environments
- Component tests: `src/**/*.svelte.{test,spec}.{js,ts}`
- Other tests: `src/**/*.{test,spec}.{js,ts}` (excluding svelte component tests)
- E2e tests: `e2e/` directory
- Storybook stories: `src/**/*.stories.@(js|ts|svelte)`

### Project Structure

- `src/routes/` - SvelteKit routes and pages
- `src/lib/` - Shared components and utilities
- `src/stories/` - Storybook components and stories
- `e2e/` - Playwright end-to-end tests
- `.storybook/` - Storybook configuration

## Development Notes

- Use `svelte-check` for TypeScript checking instead of tsc
- MDSvex allows mixing Markdown and Svelte components
- Playwright e2e tests run against built production preview (port 4173)
- Component tests require assertions (`expect.requireAssertions: true`)
