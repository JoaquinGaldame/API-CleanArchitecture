/**
 * @fileoverview Interfaz base para todos los repositorios.
 * @module core/repositories/IRepository
 * @version 1.0.0
 * @license TireControl Proprietary
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 */

/**
 * Interfaz base para todos los repositorios.
 * Define las operaciones CRUD comunes para todas las entidades.
 * Forma parte del patrón Ports & Adapters (Arquitectura Hexagonal).
 * 
 * @template T Tipo de entidad
 * @template ID Tipo de identificador
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 * @security ISO27001: A.18.1.3 - Protección de registros
 */
export interface IRepository<T, ID> {
  /**
   * Encuentra todas las entidades.
   * 
   * @returns {Promise<T[]>} Lista de entidades
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  findAll(): Promise<T[]>;
  
  /**
   * Encuentra una entidad por su identificador.
   * 
   * @param {ID} id - Identificador de la entidad
   * @returns {Promise<T | null>} Entidad encontrada o null si no existe
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  findById(id: ID): Promise<T | null>;
  
  /**
   * Crea una nueva entidad.
   * 
   * @param {Omit<T, 'id'>} item - Datos de la entidad a crear (sin ID)
   * @returns {Promise<T>} Entidad creada con su ID generado
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  create(item: Omit<T, 'id'>): Promise<T>;
  
  /**
   * Actualiza una entidad existente.
   * 
   * @param {ID} id - Identificador de la entidad
   * @param {Partial<T>} item - Datos parciales para actualizar la entidad
   * @returns {Promise<T>} Entidad actualizada
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  update(id: ID, item: Partial<T>): Promise<T>;
  
  /**
   * Elimina una entidad.
   * 
   * @param {ID} id - Identificador de la entidad a eliminar
   * @returns {Promise<void>} Promesa vacía que se resuelve cuando la eliminación es exitosa
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  delete(id: ID): Promise<void>;
}