import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// All schemas database
import * as schema from './schemas/index';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const authDB = drizzle(pool, { schema });