# Deploy Bicrypto On Railway

This app should be deployed as **two Railway services** from the same repo:

- `bicrypto-frontend` (Next.js)
- `bicrypto-backend` (API)

## 1) Create services

In Railway:

1. Create project from this GitHub repo (`main`).
2. Add a second service from the same repo.
3. Name one service `bicrypto-backend`, the other `bicrypto-frontend`.

## 2) Set build/start commands

### Backend service

- Build Command:
  `corepack enable && pnpm install --frozen-lockfile && pnpm run build:backend`
- Start Command:
  `npm run start:backend`

### Frontend service

- Build Command:
  `corepack enable && pnpm install --frozen-lockfile && pnpm run build`
- Start Command:
  `npm start`

## 3) Add MySQL

Add Railway MySQL service (or use external MySQL), then set backend variables:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

## 4) Required env vars

Use `.env.example` as source.

### Backend (minimum)

- `NODE_ENV=production`
- `APP_ACCESS_TOKEN_SECRET`
- `APP_REFRESH_TOKEN_SECRET`
- `APP_RESET_TOKEN_SECRET`
- `APP_VERIFY_TOKEN_SECRET`
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `NEXT_PUBLIC_SITE_URL=https://<frontend-domain>`

### Frontend (minimum)

- `NODE_ENV=production`
- `APP_ACCESS_TOKEN_SECRET` (must match backend)
- `NEXT_PUBLIC_FRONTEND=true`
- `NEXT_PUBLIC_SITE_URL=https://<frontend-domain>`
- `BACKEND_URL=https://<backend-domain>`

## 5) Seed database once

Run in backend service shell:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm seed
```

## 6) Verify

- Backend: `https://<backend-domain>/api/settings`
- Backend roles: `https://<backend-domain>/api/auth/role`
- Frontend: `https://<frontend-domain>/`
