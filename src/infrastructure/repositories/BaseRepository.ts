/**
 * @fileoverview Implementación base para repositorios usando Drizzle ORM.
 * @module infrastructure/db/repositories/BaseRepository
 * @version 1.0.0
 * @license TireControl Proprietary
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */

import { IRepository } from '@/core/repositories/IRepository';
import { PgTable } from 'drizzle-orm/pg-core';
import { DatabaseManager } from '../db/connections/DataBaseManager';
import { DbConnectionKey } from '../db/connections/db-connections';
import { eq } from 'drizzle-orm';


/**
 * Implementación base genérica para repositorios que utilizan Drizzle ORM.
 * Proporciona las operaciones CRUD básicas y puede extenderse para casos específicos.
 * Forma parte del patrón Repository dentro de la Arquitectura Hexagonal.
 * 
 * @template T Tipo de entidad que maneja el repositorio
 * @template ID Tipo de identificador de la entidad
 * @class BaseRepository
 * @implements IRepository<T, ID>
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 * @security ISO27001: A.18.1.3 - Protección de registros
 */
export abstract class BaseRepository<T, ID> implements IRepository<T, ID> {
   protected dbName: DbConnectionKey;
  /**
   * Constructor del repositorio base.
   * 
   * @param {PgTable} table - Tabla de Drizzle asociada a este repositorio
   * @param {any} idColumn - Columna que representa el ID en la tabla
   * @security ISO27001: A.8.2.1 - Clasificación de la información
   */
  constructor(
    protected table: PgTable,
    protected idColumn: any,
    dbName: DbConnectionKey 
  ) {
    this.dbName = dbName;
  }

  /**
   * Obtiene todos los registros de la tabla.
   * 
   * @returns {Promise<T[]>} Lista de todas las entidades
   * @security ISO27001: A.18.1.3 - Protección de registros
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   */
  async findAll(): Promise<T[]> {
    const database = DatabaseManager.getDb(this.dbName); // Usa la conexión almacenada
    return await database.select().from(this.table) as T[];
  }

  /**
   * Obtiene un registro específico por su ID.
   * 
   * @param {ID} id - ID del registro a buscar
   * @returns {Promise<T | null>} Entidad encontrada o null si no existe
   * @security ISO27001: A.18.1.3 - Protección de registros
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   */
  async findById(id: ID): Promise<T | null> {
    const database = DatabaseManager.getDb(this.dbName);
    const results = await database.select()
      .from(this.table)
      .where(eq(this.idColumn, id));
    
    return results.length > 0 ? (results[0] as T) : null;
  }

  /**
   * Crea un nuevo registro en la base de datos.
   * 
   * @param {Omit<T, 'id'>} item - Datos del registro a crear (sin ID)
   * @returns {Promise<T>} Entidad creada con su ID generado
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  async create(item: Omit<T, 'id'>): Promise<T> {
    const database = DatabaseManager.getDb(this.dbName);
    const results = await database.insert(this.table)
      .values(item as any)
      .returning();
    
    return results[0] as T;
  }

  /**
   * Actualiza un registro existente en la base de datos.
   * 
   * @param {ID} id - ID del registro a actualizar
   * @param {Partial<T>} item - Datos parciales para actualizar
   * @returns {Promise<T>} Entidad actualizada
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  async update(id: ID, item: Partial<T>): Promise<T> {
    const database = DatabaseManager.getDb(this.dbName);
    const results = await database.update(this.table)
      .set({
        ...item as any,
        updatedAt: new Date() // Mantiene actualizado el campo de seguimiento de cambios
      })
      .where(eq(this.idColumn, id))
      .returning();
    
    return results[0] as T;
  }

  /**
   * Elimina un registro de la base de datos.
   * 
   * @param {ID} id - ID del registro a eliminar
   * @returns {Promise<void>} Promesa vacía que se resuelve al completar la operación
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  async delete(id: ID): Promise<void> {
    const database = DatabaseManager.getDb(this.dbName);
    await database.delete(this.table)
      .where(eq(this.idColumn, id));
  }
}