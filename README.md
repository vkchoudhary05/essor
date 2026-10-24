# ESSOR Compliance Solutions - Full-Stack Architecture

Enterprise food safety compliance, audit readiness, and certification platform.

This project is organized into two completely decoupled and independently deployable services:

```text
├── frontend/             # Standalone React 19 + Vite SPA (Deploy to domain: e.g. essorcompliance.com)
│   ├── src/              # React components, pages, state & API client
│   ├── public/           # Static assets, sitemap & icons
│   ├── index.html        # HTML entry point with metadata
│   ├── vite.config.ts    # Vite configuration & dev proxy
│   ├── package.json      # Frontend-only dependencies
│   ├── tsconfig.json     # TypeScript configuration
│   └── .env.example      # Frontend environment template
│
├── backend/              # Standalone Express + TypeScript API (Deploy to subdomain: e.g. api.essorcompliance.com)
│   ├── config/           # Server and CORS configuration
│   ├── controllers/      # Route controllers
│   ├── db/               # MySQL database adapter & SQL schema
│   ├── middlewares/      # Authentication, CORS, error & logger middlewares
│   ├── repositories/     # Data repositories
│   ├── routes/           # Express API endpoints (/api/v1 and /api)
│   ├── services/         # Business logic (Certificates, Audits, CAPA, Gemini AI)
│   ├── types/            # Self-contained backend type definitions
│   ├── data/             # Seed catalogs & initial mock data
│   ├── .data/            # Persistent JSON datastore (essor_store.json)
│   ├── server.ts         # Pure Express HTTP server entrypoint
│   ├── package.json      # Backend-only dependencies
│   ├── tsconfig.json     # Node.js TypeScript configuration
│   └── .env.example      # Backend environment template
│
├── .vscode/              # Preconfigured VS Code tasks & debuggers
│   ├── tasks.json        # One-click dev & build tasks
│   ├── launch.json       # Debugger configurations
│   └── settings.json     # Workspace settings
│
├── docker-compose.yml    # Multi-container orchestration
├── package.json          # Root npm workspace orchestrator
└── README.md
```

---

## 🚀 Quick Start in VS Code

### 1. Install All Dependencies
Run from the root directory:
```bash
npm install
```
*(This automatically installs dependencies for both `frontend` and `backend` using npm workspaces.)*

### 2. Start Both Frontend and Backend Concurrently
From the root terminal, run:
```bash
npm run dev
```

In your VS Code terminal, you will see both services run with color-coded tags:
- **`[BACKEND]`**: listening on `http://localhost:5000`
- **`[FRONTEND]`**: listening on `http://localhost:5173`

During development, any request to `/api/*` from the frontend is automatically forwarded to the backend on `http://localhost:5000` via Vite's proxy. No CORS issues, zero extra setup.

### 3. Alternative Individual Commands

| Command | Action |
| :--- | :--- |
| `npm run dev:frontend` | Start only the frontend Vite server |
| `npm run dev:backend` | Start only the backend API server |
| `npm run build` | Build both frontend and backend for production |
| `npm run build:frontend` | Build only the frontend static distribution (`frontend/dist`) |
| `npm run build:backend` | Typecheck backend |

Or open separate terminals in VS Code:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

---

## 🌐 Deployment Architecture

### 1. Frontend: Deploy to Domain (e.g., `https://essorcompliance.com`)

The frontend can be deployed to **Vercel**, **Netlify**, **Cloudflare Pages**, or **Hostinger Web Hosting**.

1. **Root Directory on Host:** Set to `frontend`
2. **Build Command:** `npm run build`
3. **Publish / Output Directory:** `dist`
4. **Environment Variables:**
   ```env
   VITE_API_BASE_URL=https://api.essorcompliance.com
   ```
   *(Replace with your actual backend subdomain)*

### 2. Backend: Deploy to Subdomain (e.g., `https://api.essorcompliance.com`)

The backend can be deployed to **Hostinger VPS**, **Render**, **Railway**, **AWS EC2 / App Runner**, or **DigitalOcean**.

1. **DNS Setup:** Create a DNS `A` or `CNAME` record for `api` pointing to your backend server IP/host.
2. **Root Directory on Host:** Set to `backend`
3. **Start Command:** `npm start` (or `tsx server.ts`)
4. **Environment Variables:**
   ```env
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=https://essorcompliance.com,https://www.essorcompliance.com
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

---

## 🐙 Pushing to GitHub

When you commit and push this repository to GitHub `main` branch:
1. GitHub will show the two clean directories: `frontend/` and `backend/`.
2. Anyone cloning can simply run `npm install` and `npm run dev` in VS Code to get the full application running immediately.
