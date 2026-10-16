import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './server/config/server.config';
import { apiRouter } from './server/routes';
import { requestLogger } from './server/middlewares/logger.middleware';
import { errorHandler } from './server/middlewares/error.middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // Basic Body Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // CORS headers
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.cors.allowedOrigins);
    res.setHeader('Access-Control-Allow-Methods', config.cors.allowedMethods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', config.cors.allowedHeaders.join(', '));
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Request Logging
  app.use(requestLogger);

  // Mount REST backend API endpoints under /api/v1 and alias /api
  app.use(config.apiPrefix, apiRouter);
  app.use('/api', apiRouter);

  if (!config.isProduction) {
    // Development mode: Vite middleware attached to Express
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  // Centralized API Error Handling
  app.use(errorHandler);

  app.listen(config.port, config.host, () => {
    console.log(`[ESSOR Platform] Unified Server listening on port ${config.port} (${config.env})`);
    console.log(`[Backend API v1] Ready at http://${config.host}:${config.port}${config.apiPrefix}`);
  });
}

startServer().catch(err => {
  console.error('[ESSOR Platform] Server fatal startup error:', err);
  process.exit(1);
});
