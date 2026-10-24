# ESSOR Frontend Application

Modern React 19 + TypeScript + Vite + Tailwind CSS enterprise web application for ESSOR Compliance Solutions.

## Features
- Complete Food Safety Consultation & Audit Readiness Portal
- Interactive Audit Simulator & Digital Inspection Checklists
- Inbound Lead Management & Real-Time Consultation Ingestion
- FoSTaC & Lead Auditor Training Course Catalog & Verification Engine
- Responsive Design with Tailwind CSS v4, Lucide Icons, GSAP & Smooth Scroll

---

## Local Development

```bash
# 1. Navigate to frontend directory
cd frontend

# 2. Install dependencies (if not using root monorepo install)
npm install

# 3. Create .env from template (optional in local dev)
copy .env.example .env

# 4. Start Vite dev server
npm run dev
```

Frontend runs at `http://localhost:5173`.
All requests to `/api` are automatically proxied by Vite to the backend running at `http://localhost:5000`.

---

## Production Deployment to Custom Domain (e.g. `yourdomain.com`)

You can deploy the frontend to **Vercel**, **Netlify**, **Cloudflare Pages**, or **Hostinger Static Web Hosting**.

### Environment Variable
In your hosting provider's dashboard, add:
```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Build Command
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18+ or 20+

### Single Page Application (SPA) Routing Rule
Ensure all fallback requests route to `index.html`:
- For **Vercel**: included via `vercel.json` or rewrite settings.
- For **Netlify**: create a `_redirects` file with `/*  /index.html  200`.
- For **Apache / Hostinger cPanel**: `.htaccess` rewrite rule:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

