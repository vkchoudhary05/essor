# ESSOR Backend API Service

Standalone Express + TypeScript REST API powering the ESSOR Compliance Solutions platform.

## Features
- Complete REST API (`/api/v1` and `/api`)
- Full CORS configuration for cross-domain / subdomain frontend hosting
- Health checks (`/health`, `/api/v1/health`)
- Dual-mode data persistence:
  - Local resilient JSON database (`.data/essor_store.json`)
  - Production Hostinger MySQL database (`server/db/mysql.ts`)
- Server-side Gemini AI Food Safety advisor endpoints (`/api/ai/query`)

---

## Local Development

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies (if not using monorepo root)
npm install

# 3. Create .env from template
copy .env.example .env

# 4. Run in watch/development mode
npm run dev
```

The API will be live at:
- **Base URL:** `http://localhost:5000`
- **Health check:** `http://localhost:5000/health`
- **API v1 Base:** `http://localhost:5000/api/v1`

---

## Subdomain Deployment Guide (e.g. `api.yourdomain.com`)

### 1. DNS Setup
In your domain registrar / DNS manager (Hostinger, Cloudflare, GoDaddy):
- Add an **A Record** or **CNAME Record**:
  - **Type:** `A` (if pointing to VPS/Server IP) or `CNAME`
  - **Name/Host:** `api`
  - **Points to:** Your server IP or host (e.g., `123.45.67.89` or `backend.onrender.com`)

### 2. Environment Variables in Production
Set the following on your backend server:
```env
PORT=5000 # or whatever port your hosting provider assigns
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com,https://www.yourdomain.com
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Process Management (Hostinger VPS / PM2 / Systemd)
```bash
npm install -g pm2
pm2 start "npm start" --name essor-backend
pm2 save
pm2 startup
```

### 4. Nginx Reverse Proxy Sample (if using VPS)
```nginx
server {
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

