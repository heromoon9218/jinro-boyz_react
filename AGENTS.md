# AGENTS.md

## Cursor Cloud specific instructions

### Overview

**人狼BOYZ (Jinro BOYZ)** — React フロントエンド SPA（人狼ゲーム）。バックエンド（jinro-boyz_rails）は別リポジトリ。

### Tech Stack

- React 19, TypeScript 5.9, Vite 7, Tailwind CSS 4, React Router 7
- Node.js 24.13.1 (`.nvmrc` で指定)
- npm (lockfile: `package-lock.json`)

### Dev Commands

Standard commands are in `package.json` scripts:

| Task | Command |
|---|---|
| Dev server | `npm run dev` (port 5173) |
| Build | `npm run build` |
| Lint + format fix | `npm run fix` |
| Lint only | `npx eslint src` |
| Format check | `npx prettier --check src` |
| E2E tests | `npm run test:e2e` |

### Environment Variables

Copy `.env.example` to `.env` before running. Key variable: `VITE_API_URL` (defaults to `http://localhost:3000`).

### Non-obvious Notes

- The backend API (`jinro-boyz_rails`) is **not** in this repo. The frontend renders placeholder content without it — no startup errors, but API calls will fail.
- Node.js version must be exactly **24.13.1**. Use `nvm use` to activate after `nvm install 24.13.1`.
- Vite dev server binds to `localhost:5173` by default. Use `--host` flag if you need to bind to `0.0.0.0` (e.g., in Docker).
- Playwright E2E tests (`npm run test:e2e`) require Playwright browsers to be installed first: `npx playwright install --with-deps chromium`.
