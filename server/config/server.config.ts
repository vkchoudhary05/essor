export const config = {
  port: Number(process.env.PORT) || 3000,
  host: '0.0.0.0',
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  apiPrefix: '/api/v1',
  apiVersion: '1.0.0',
  serviceName: 'ESSOR Compliance Solutions Enterprise Backend API',
  dataDirectory: '.data',
  storeFileName: 'essor_store.json',
  cors: {
    allowedOrigins: '*',
    allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Simulated-Role']
  }
} as const;
