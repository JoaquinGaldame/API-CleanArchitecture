import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { connection_db, DbConnectionKey } from './db-connections';
// Todos los schemas DB
import * as schema from '../schemas/index';

/**
 * Mapa global que almacena instancias de bases de datos Drizzle activas por clave de conexión.
 */
const dbInstances = new Map<DbConnectionKey, NodePgDatabase<typeof schema>>();

/**
 * Mapa global que almacena instancias de `pg.Pool` activas por clave de conexión.
 */
const poolInstances = new Map<DbConnectionKey, Pool>();

/**
 * Mapa que almacena los timeouts activos para autocierre de pools.
 */
const poolTimeouts = new Map<DbConnectionKey, NodeJS.Timeout>();


/**
 * Inicia o reinicia el temporizador de cierre automático del pool para una conexión específica.
 *
 * @param key - Clave de conexión de base de datos (connection string).
 *
 * Si no hay actividad durante 5 minutos (300.000 ms), se cerrará la conexión automáticamente.
 */
function startAutoCloseTimer(key: DbConnectionKey) {
  if (poolTimeouts.has(key)) clearTimeout(poolTimeouts.get(key)!);

  const timeout = setTimeout(async () => {
    const pool = poolInstances.get(key);
    if (pool) {
      await pool.end();
      poolInstances.delete(key);
      dbInstances.delete(key);
      poolTimeouts.delete(key);
    }
  }, 5 * 60 * 1000); // 5 minutos

  poolTimeouts.set(key, timeout);
}

/**
 * Gestor de bases de datos multi-conexión.
 *
 * Permite obtener o reutilizar conexiones a múltiples bases de datos, y maneja automáticamente
 * su cierre tras un período de inactividad.
 */
export class DatabaseManager {

  /**
   * Retorna una instancia reutilizable de Drizzle para la clave de conexión dada.
   * Si la instancia ya existe, la reutiliza y reinicia el temporizador de autocierre.
   *
   * @param connectionKey - Clave identificadora de la conexión.
   * @returns Instancia de `NodePgDatabase` correspondiente al esquema cargado.
   * @throws Error si no existe configuración para la clave dada.
   */
  static getDb(connectionKey: DbConnectionKey) {
    if (dbInstances.has(connectionKey)) {
      startAutoCloseTimer(connectionKey); 
      return dbInstances.get(connectionKey)!;
    }

    const config = connection_db[connectionKey];
    if (!config) throw new Error(`No existe configuración para la conexión:  ${connectionKey}`);
    const pool = new Pool({
      ...config,
      max: Number(process.env.PG_POOL_MAX) || 5, // Máximo de conexiones simultaneas entre 5 y 20 dependiendo del tráfico
      idleTimeoutMillis: 10000,                  // Tiempo de inactividad tras el cual se cierra una conexión
      connectionTimeoutMillis: 3000,             // Timeout al intentar conectar
    });
    const db = drizzle(pool, { schema });
    dbInstances.set(connectionKey, db);
    poolInstances.set(connectionKey, pool);
    startAutoCloseTimer(connectionKey);
    return db;
  }
  


  /**
   * Ejecuta una función utilizando una instancia de base de datos que se libera inmediatamente al terminar.
   * Útil para operaciones aisladas sin mantener conexiones abiertas.
   *
   * @typeParam T - Tipo de retorno esperado de la función `fn`.
   * @param connectionKey - Clave identificadora de la conexión.
   * @param fn - Función asíncrona que recibe la instancia de Drizzle para ejecutar lógica de negocio.
   * @returns El valor retornado por `fn`.
   * @throws Error si la clave de conexión no tiene configuración asociada.
   */
  static async withDb<T>(connectionKey: DbConnectionKey, fn: (db: NodePgDatabase<typeof schema>) => Promise<T>): Promise<T> {
    const config = connection_db[connectionKey];
    if (!config) throw new Error(`No existe configuración para la conexión: ${connectionKey}`);

    const pool = poolInstances.get(connectionKey) ?? (() => {
      const newPool = new Pool({ ...config, max: 5, idleTimeoutMillis: 10000 });
      poolInstances.set(connectionKey, newPool);
      return newPool;
    })();

    const client = await pool.connect(); // Obtenemos el cliente individual del pool
    try {
      const db = drizzle(client, { schema });
      return await fn(db);
    } finally {
      client.release(); // Liberaramos el cliente
    }
  }


  /**
   * Cierra todas las conexiones y limpia los registros de pools y bases activas.
   * Útil para operaciones de apagado o limpieza de recursos.
   */
  static async closeAll() {
    for (const [key, pool] of poolInstances) {
      await pool.end();
      dbInstances.delete(key);
      poolInstances.delete(key);
    }
  }
}