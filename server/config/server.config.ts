function getPort(): number {
  // Check CLI arguments first: --port 3000 or -p 3000
  const portArgIndex = process.argv.findIndex(arg => arg === '--port' || arg === '-p');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const p = Number(process.argv[portArgIndex + 1]);
    if (!isNaN(p) && p > 0) return p;
  }

  // In development (AI Studio environment), reverse proxy (nginx) binds to 8080 and proxies to 3000.
  // The Node dev server must always listen on port 3000.
  if (process.env.NODE_ENV !== 'production') {
    return 3000;
  }

  return Number(process.env.PORT) || 3000;
}

function getHost(): string {
  const hostArgIndex = process.argv.findIndex(arg => arg === '--host' || arg === '-h');
  if (hostArgIndex !== -1 && process.argv[hostArgIndex + 1]) {
    return process.argv[hostArgIndex + 1];
  }
  return '0.0.0.0';
}

export const config = {
  port: getPort(),
  host: getHost(),
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
