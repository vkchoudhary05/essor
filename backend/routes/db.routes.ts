import { Router, Request, Response } from 'express';
import { dbManager } from '../db/mysql';
import fs from 'fs';
import path from 'path';

export const dbRouter = Router();

/**
 * GET /api/db/status
 * Returns connection status and diagnostics
 */
dbRouter.get('/status', async (_req: Request, res: Response) => {
  try {
    const status = await dbManager.getStatus();
    res.json(status);
  } catch (err: any) {
    res.status(500).json({
      error: 'Failed to retrieve database status',
      details: err.message
    });
  }
});

/**
 * POST /api/db/test
 * Tests arbitrary connection credentials (e.g. from Admin UI test form)
 */
dbRouter.post('/test', async (req: Request, res: Response) => {
  const { host, port, user, password, database } = req.body;

  if (!host || !user || !database) {
    return res.status(400).json({
      success: false,
      message: 'Missing required parameters: host, user, and database are required.'
    });
  }

  const result = await dbManager.testCredentials({
    host,
    port: port ? parseInt(port, 10) : 3306,
    user,
    password,
    database
  });

  return res.json(result);
});

/**
 * POST /api/db/sync
 * Re-attempts connection with current environment variables
 */
dbRouter.post('/sync', async (_req: Request, res: Response) => {
  const ok = await dbManager.initPool();
  const status = await dbManager.getStatus();
  return res.json({
    success: ok,
    status
  });
});

/**
 * GET /api/db/schema-sql
 * Returns the raw SQL schema for direct copy/paste into Hostinger phpMyAdmin
 */
dbRouter.get('/schema-sql', (_req: Request, res: Response) => {
  const schemaPath = path.resolve(process.cwd(), 'server', 'db', 'hostinger_schema.sql');
  if (fs.existsSync(schemaPath)) {
    const sql = fs.readFileSync(schemaPath, 'utf-8');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(sql);
  }
  return res.status(404).send('-- Schema file not found');
});
