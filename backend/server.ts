import 'dotenv/config';
import express from 'express';
import { config } from './config/server.config';
import { apiRouter } from './routes';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';

async function startServer() {
  const app = express();

  // Basic Body Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // CORS Middleware supporting multi-domain & subdomain
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowed = config.cors.allowedOrigins;

    if (allowed === '*') {
      res.setHeader('Access-Control-Allow-Origin', '*');
    } else if (Array.isArray(allowed)) {
      if (origin && allowed.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
      }
      res.setHeader('Vary', 'Origin');
    } else if (typeof allowed === 'string') {
      res.setHeader('Access-Control-Allow-Origin', allowed);
    }

    res.setHeader('Access-Control-Allow-Methods', config.cors.allowedMethods.join(', '));
    res.setHeader('Access-Control-Allow-Headers', config.cors.allowedHeaders.join(', '));

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  // Request Logging
  app.use(requestLogger);

  // Root Info Route
  app.get('/', (_req, res) => {
    res.json({
      status: 'online',
      service: config.serviceName,
      version: config.apiVersion,
      environment: config.env,
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/health',
        apiHealth: `${config.apiPrefix}/health`,
        stats: `${config.apiPrefix}/stats`,
        authMe: `${config.apiPrefix}/auth/me`,
        catalogServices: `${config.apiPrefix}/services`,
        catalogCourses: `${config.apiPrefix}/courses`
      }
    });
  });

  // Top-level Health check
  app.get('/health', (_req, res) => {
    res.json({
      status: 'UP',
      service: config.serviceName,
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  });

  // Mount REST backend API endpoints under /api/v1 and alias /api
  app.use(config.apiPrefix, apiRouter);
  app.use('/api', apiRouter);

  // 404 Handler for undefined API routes
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: 'Endpoint not found',
      path: req.originalUrl,
      method: req.method
    });
  });

  // Centralized API Error Handling
  app.use(errorHandler);

  app.listen(config.port, config.host, () => {
    console.log(`====================================================`);
    console.log(`[ESSOR Platform] Backend API listening on port ${config.port}`);
    console.log(`[Backend URL] http://${config.host === '0.0.0.0' ? 'localhost' : config.host}:${config.port}`);
    console.log(`[API v1 Base] http://${config.host === '0.0.0.0' ? 'localhost' : config.host}:${config.port}${config.apiPrefix}`);
    console.log(`[Environment] ${config.env}`);
    console.log(`====================================================`);
  });
}

startServer().catch(err => {
  console.error('[ESSOR Platform] Backend fatal startup error:', err);
  process.exit(1);
});
