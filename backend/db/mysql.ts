import mysql from 'mysql2/promise';

export interface DatabaseStatus {
  isConfigured: boolean;
  isConnected: boolean;
  engine: 'mysql' | 'local_store';
  host?: string;
  database?: string;
  user?: string;
  tables?: string[];
  message: string;
  lastChecked: string;
}

class MySQLManager {
  private pool: mysql.Pool | null = null;
  private isConnected = false;
  private lastError: string | null = null;

  constructor() {
    this.initPool();
  }

  /**
   * Initializes the MySQL connection pool if DB_HOST and DB_NAME are present
   */
  public async initPool(): Promise<boolean> {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    const port = parseInt(process.env.DB_PORT || '3306', 10);

    if (!host || !database || !user) {
      this.isConnected = false;
      this.lastError = 'Hostinger MySQL environment variables (DB_HOST, DB_USER, DB_NAME) are not configured.';
      return false;
    }

    try {
      this.pool = mysql.createPool({
        host,
        port,
        user,
        password: password || '',
        database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
        connectTimeout: 10000
      });

      // Verify connection
      const connection = await this.pool.getConnection();
      await connection.ping();
      connection.release();

      this.isConnected = true;
      this.lastError = null;
      console.log(`[Hostinger MySQL] Successfully connected to database '${database}' on '${host}:${port}'`);
      
      // Auto-run baseline table migrations
      await this.ensureTablesExist();

      return true;
    } catch (err: any) {
      this.isConnected = false;
      this.lastError = err.message || 'Unknown database connection error';
      console.warn(`[Hostinger MySQL] Could not establish connection to ${host}:${port}: ${this.lastError}`);
      return false;
    }
  }

  /**
   * Checks whether the necessary tables exist, or creates them if missing
   */
  public async ensureTablesExist(): Promise<void> {
    if (!this.pool || !this.isConnected) return;

    try {
      // 1. Enquiries Table
      await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS \`enquiries\` (
          \`id\` VARCHAR(64) NOT NULL,
          \`name\` VARCHAR(128) NOT NULL,
          \`company_name\` VARCHAR(191) NOT NULL,
          \`email\` VARCHAR(191) NOT NULL,
          \`phone\` VARCHAR(32) NOT NULL,
          \`service_type\` VARCHAR(128) NOT NULL,
          \`facility_size\` VARCHAR(64) DEFAULT NULL,
          \`message\` TEXT NOT NULL,
          \`status\` ENUM('NEW', 'CONTACTED', 'IN_DISCUSSION', 'PROPOSAL_SENT', 'CONVERTED', 'CLOSED') NOT NULL DEFAULT 'NEW',
          \`priority\` ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'MEDIUM',
          \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 2. Certificates Table
      await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS \`certificates\` (
          \`id\` VARCHAR(64) NOT NULL,
          \`certificate_number\` VARCHAR(128) NOT NULL UNIQUE,
          \`recipient_name\` VARCHAR(191) NOT NULL,
          \`organization_name\` VARCHAR(191) NOT NULL,
          \`course_name\` VARCHAR(191) NOT NULL,
          \`standard_code\` VARCHAR(64) NOT NULL,
          \`issue_date\` DATE NOT NULL,
          \`status\` ENUM('ACTIVE', 'EXPIRED', 'REVOKED', 'PENDING') NOT NULL DEFAULT 'ACTIVE',
          \`lead_trainer_name\` VARCHAR(128) NOT NULL,
          \`verification_url\` VARCHAR(255) NOT NULL,
          \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 3. System Users Table
      await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS \`users\` (
          \`id\` VARCHAR(64) NOT NULL,
          \`name\` VARCHAR(128) NOT NULL,
          \`email\` VARCHAR(191) NOT NULL UNIQUE,
          \`role\` VARCHAR(64) NOT NULL DEFAULT 'CLIENT_ADMIN',
          \`phone\` VARCHAR(32) DEFAULT NULL,
          \`is_active\` TINYINT(1) NOT NULL DEFAULT 1,
          \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      // 4. Public AI advisor conversations
      await this.pool.execute(`
        CREATE TABLE IF NOT EXISTS \`ai_chat_messages\` (
          \`id\` VARCHAR(64) NOT NULL,
          \`conversation_id\` VARCHAR(64) NOT NULL,
          \`visitor_name\` VARCHAR(128) DEFAULT NULL,
          \`role\` ENUM('visitor', 'advisor') NOT NULL,
          \`content\` TEXT NOT NULL,
          \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (\`id\`),
          INDEX \`idx_ai_chat_conversation\` (\`conversation_id\`, \`created_at\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      console.log('[Hostinger MySQL] Essential tables verified and synced.');
    } catch (err) {
      console.error('[Hostinger MySQL] Error ensuring tables exist:', err);
    }
  }

  /**
   * Returns current status of MySQL connection
   */
  public async getStatus(): Promise<DatabaseStatus> {
    const host = process.env.DB_HOST;
    const database = process.env.DB_NAME;
    const user = process.env.DB_USER;

    const isConfigured = Boolean(host && database && user);

    let tables: string[] = [];
    if (this.pool && this.isConnected) {
      try {
        const [rows]: any = await this.pool.query('SHOW TABLES');
        tables = rows.map((r: any) => Object.values(r)[0] as string);
      } catch {
        // Ignored
      }
    }

    return {
      isConfigured,
      isConnected: this.isConnected,
      engine: this.isConnected ? 'mysql' : 'local_store',
      host: host ? `${host}:${process.env.DB_PORT || '3306'}` : undefined,
      database,
      user,
      tables,
      message: this.isConnected
        ? `Fully connected and active on Hostinger database '${database}' (${tables.length} tables found).`
        : isConfigured
        ? `Configured but unable to connect: ${this.lastError || 'Connection failed'}`
        : 'Running on file-based JSON storage (.data/essor_store.json). Configure Hostinger credentials in .env to switch to MySQL.',
      lastChecked: new Date().toISOString()
    };
  }

  /**
   * Tests connection with arbitrary credentials without modifying server state
   */
  public async testCredentials(config: {
    host: string;
    port?: number;
    user: string;
    password?: string;
    database: string;
  }): Promise<{ success: boolean; message: string; tablesCount?: number }> {
    try {
      const testConn = await mysql.createConnection({
        host: config.host,
        port: config.port || 3306,
        user: config.user,
        password: config.password || '',
        database: config.database,
        connectTimeout: 7000
      });

      await testConn.ping();
      const [rows]: any = await testConn.query('SHOW TABLES');
      await testConn.end();

      return {
        success: true,
        message: `Success! Connected to database '${config.database}' on Hostinger (${rows.length} existing tables).`,
        tablesCount: rows.length
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Connection failed. Please check host, user, password, and Remote MySQL access.'
      };
    }
  }

  /**
   * Executes a safe query on the active pool
   */
  public async query(sql: string, params: any[] = []): Promise<any> {
    if (!this.pool || !this.isConnected) {
      throw new Error('MySQL is not connected.');
    }
    return this.pool.query(sql, params);
  }

  public getPool(): mysql.Pool | null {
    return this.pool;
  }

  public getConnected(): boolean {
    return this.isConnected;
  }
}

export const dbManager = new MySQLManager();
