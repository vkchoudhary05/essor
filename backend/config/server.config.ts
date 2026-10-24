function getPort(): number {
  // Check CLI arguments first: --port 5000 or -p 5000
  const portArgIndex = process.argv.findIndex(arg => arg === '--port' || arg === '-p');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    const p = Number(process.argv[portArgIndex + 1]);
    if (!isNaN(p) && p > 0) return p;
  }

  if (process.env.PORT) {
    const p = Number(process.env.PORT);
    if (!isNaN(p) && p > 0) return p;
  }

  // Default backend port is 5000 (leaves 5173 / 3000 free for frontend)
  return 5000;
}

function getHost(): string {
  const hostArgIndex = process.argv.findIndex(arg => arg === '--host' || arg === '-h');
  if (hostArgIndex !== -1 && process.argv[hostArgIndex + 1]) {
    return process.argv[hostArgIndex + 1];
  }
  return process.env.HOST || '0.0.0.0';
}

function getCorsOrigins(): string | string[] {
  const envOrigin = process.env.CORS_ORIGIN;
  if (!envOrigin || envOrigin.trim() === '*' || envOrigin.trim() === '') {
    return '*';
  }
  return envOrigin.split(',').map(s => s.trim()).filter(Boolean);
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
    allowedOrigins: getCorsOrigins(),
    allowedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Simulated-Role']
  }
};
