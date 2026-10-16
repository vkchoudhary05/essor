import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { config } from '../config/server.config';

import { authRouter } from './auth.routes';
import { statsRouter } from './stats.routes';
import { enquiryRouter } from './enquiry.routes';
import { organizationRouter } from './organization.routes';
import { visitRouter } from './visit.routes';
import { capaRouter } from './capa.routes';
import { trainingRouter } from './training.routes';
import { certificateRouter } from './certificate.routes';
import { serviceRouter, courseRouter } from './catalog.routes';
import { cmsRouter } from './cms.routes';
import { auditLogRouter } from './auditLog.routes';
import { aiRouter } from './ai.routes';

export const apiRouter = Router();

// Apply auth/persona resolution middleware to all API routes
apiRouter.use(authMiddleware);

// 1. Health & Server Metadata
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ONLINE',
    service: config.serviceName,
    version: config.apiVersion,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: config.env
  });
});

// 2. Sub-domain modular routes
apiRouter.use('/auth', authRouter);
apiRouter.use('/stats', statsRouter);
apiRouter.use('/enquiries', enquiryRouter);
apiRouter.use('/organizations', organizationRouter);
apiRouter.use('/visits', visitRouter);
apiRouter.use('/capa', capaRouter);
apiRouter.use('/training', trainingRouter);
apiRouter.use('/certificates', certificateRouter);
apiRouter.use('/services', serviceRouter);
apiRouter.use('/courses', courseRouter);
apiRouter.use('/cms', cmsRouter);
apiRouter.use('/audit-logs', auditLogRouter);
apiRouter.use('/ai', aiRouter);

// 3. OpenAPI 3.0 Documentation Specification
apiRouter.get('/openapi.json', (_req: Request, res: Response) => {
  res.json({
    openapi: '3.0.3',
    info: {
      title: 'ESSOR Compliance Solutions REST API',
      version: config.apiVersion,
      description: 'Senior multi-tier REST API for food safety audit readiness, continuous compliance, training, and multi-tenant portals.'
    },
    servers: [{ url: config.apiPrefix }],
    paths: {
      '/health': { get: { summary: 'System health check & server uptime' } },
      '/stats': { get: { summary: 'Calculated operational metrics for dashboard widgets' } },
      '/auth/me': { get: { summary: 'Retrieve active persona profile' } },
      '/auth/switch-role': { post: { summary: 'Simulate switching between RBAC user roles' } },
      '/auth/login': { post: { summary: 'Authenticate or initialize client user' } },
      '/enquiries': { 
        get: { summary: 'List all inbound lead enquiries' },
        post: { summary: 'Submit client consultation enquiry' }
      },
      '/enquiries/{id}/status': { patch: { summary: 'Update enquiry status workflow' } },
      '/enquiries/{id}/notes': { post: { summary: 'Add internal consultant follow-up note' } },
      '/enquiries/export/csv': { get: { summary: 'Export enquiries as CSV' } },
      '/organizations': { 
        get: { summary: 'List client organizations' },
        post: { summary: 'Create or update organization' }
      },
      '/organizations/{id}/sites': { post: { summary: 'Add facility site to organization' } },
      '/visits': { 
        get: { summary: 'List company visits & mock audits' },
        post: { summary: 'Schedule new company audit visit' }
      },
      '/visits/{id}/review': { patch: { summary: 'Auditor inspection review and approval' } },
      '/capa': { 
        get: { summary: 'List corrective actions (CAPA)' },
        post: { summary: 'Create or update corrective action item' }
      },
      '/capa/{id}/evidence': { post: { summary: 'Upload client corrective action evidence' } },
      '/capa/{id}/review': { patch: { summary: 'Approve closeout or request rework' } },
      '/training/sessions': { 
        get: { summary: 'List training sessions and cohorts' },
        post: { summary: 'Schedule new training batch' }
      },
      '/training/sessions/{id}/enroll': { post: { summary: 'Enrol participant in batch' } },
      '/training/sessions/{sId}/enrollments/{eId}/attendance': { patch: { summary: 'Mark attendance status' } },
      '/training/sessions/{sId}/enrollments/{eId}/assessment': { patch: { summary: 'Record assessment score' } },
      '/training/sessions/{sId}/enrollments/{eId}/approve-issue': { post: { summary: 'Approve completion and generate certificate' } },
      '/certificates': { get: { summary: 'Master registry of issued certificates' } },
      '/certificates/verify/{certNumber}': { get: { summary: 'Verify certificate authenticity and increment view count' } },
      '/certificates/{id}/revoke': { patch: { summary: 'Revoke certificate with justification' } },
      '/services': { 
        get: { summary: 'List all service categories and deliverables' },
        post: { summary: 'Create or update consulting service' }
      },
      '/courses': { 
        get: { summary: 'List 16-course training syllabus' },
        post: { summary: 'Create or update course syllabus' }
      },
      '/cms': { 
        get: { summary: 'Get global CMS copy' },
        put: { summary: 'Update global CMS copy' }
      },
      '/audit-logs': { get: { summary: 'Retrieve system audit trail' } }
    }
  });
});
