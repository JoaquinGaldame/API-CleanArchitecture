import { IEntityRepository } from "@/core/repositories/entity/Entity.repository";
import { DatabaseManager } from "@/infrastructure/db/connections/DataBaseManager";
import { DbConnectionKey } from "@/infrastructure/db/connections/db-connections";
import { BaseRepository } from '../BaseRepository';
import { eq} from 'drizzle-orm';
import { Entity, entity, entityId } from "@/infrastructure/db/schemas";

/**
 * @fileoverview Implementación concreta del repositorio de Entitidad utilizando Drizzle ORM.
 * Extiende las funcionalidades del repositorio base añadiendo métodos específicos
 * para la gestión de la Entidad en la base de datos. Solo procesa Schemas de la base de datos y
 * está configurado para una base de datos espeficada.
 * 
 * @module infraestructure/repositories/entity/entity.repository.impl
 * @version 1.0.0
 * @license Galdame Proprietary
 * 
 * @class EntityRepository
 * @extends BaseRepository - extensión de implementación base genérica para repositorios (CRUD)
 * @param {Entity} Entity - Entidad de la base de datos
 * @param {Number} ID - ID de la entidad de la base de datos
 * @implements IEntityRepository
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 * @security ISO27001: A.18.1.3 - Protección de registros
 */

export class EntityRepository extends BaseRepository<Entity, number> implements IEntityRepository {
  /**
   * Constructor del repositorio de una Entidad determinada.
   * Inicializa el repositorio base con la tabla de la Entidad y su columna de ID.
   * Se inicializa una conexión por parámetro a una Base de Datos especificada.
   * 
   * @constructor
   * @param {DbConnectionKey} dbName - Clave de conexión database que debe ser un valor válidos de DbConnectionKey
   * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
   */
  constructor(dbName: DbConnectionKey) {
    super(entity, entityId, dbName);
  }

     /**
   * Sobrescribe el método findAll para aplicar en Use Case
   * 
   * @returns {Promise<Vehicle[]>} Lista completa de vehículos en el sistema
   * @override
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  async findAll(): Promise<Entity[]> {
    return super.findAll();
  }

  /**
   * Sobrescribe el método create para aplicar en Use Case
   * 
   * @param {Omit<Entity, 'id'>} entity - Datos del vehículo a crear (sin ID)
   * @returns {Promise<Entity>} Vehículo creado con su ID generado
   * @override
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  async create(entity: Omit<Entity, 'id'>): Promise<Entity> {
    return super.create(entity);
  }

  /**
   * Sobrescribe el método update para aplicar en Use Case
   * 
   * @param {number} id - ID de la Entidad a actualizar
   * @param {Partial<Entity>} entity - Datos parciales de la Entidad a actualizar
   * @returns {Promise<Entity>} Entidad actualizada
   * @override
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  async update(id: number, entity: Partial<Entity>): Promise<Entity> {
    return super.update(id, entity);
  }


   /**
   * Implementación del método de eliminación de una Entidad utilizando el Administrador de Bases de datos
   * verificando que no existan entidades asociadas. Funcionalidad desarrollada como ejemplo, NO FUNCIONAL.
   * 
   * @param {number} ID - Identificador de la entidad a eliminar
   * @returns {Promise<number, string, Entity[]>} Promesa de número de filas eliminadas como confirmación e información detallada
   * @security ISO27001: A.12.1.1 - Documentación de procedimientos operativos
   * @security ISO27001: A.18.1.3 - Protección de registros
   */
  async deleteEntity(ID: number): Promise<{count: number, message: string, entities: Entity}> {
    // Permitime usar el administrador de la base de datos para seleccionar la Base de Datos a procesar
    const database = DatabaseManager.getDb(this.dbName);

    const existings = await database
      .select().from(entity) 
      .where(eq(entity.id, ID));
    
    // Si existen entidades asociados no eliminamos
    if(existings.length > 0){
      return{
        count: 0,
        message: `Existen ${existings.length} entidades asociados al Tipo de Entidad a eliminar`,
        entities: existings[0] as Entity
      }
    } else{
      // No existen neumáticos asociados entonces eliminamos
      const entityDeleted = await database
        .delete(entity)
        .where(eq(entity.id, ID))
        .returning();
      return{
        count: entityDeleted.length,
        message: 'Entidad eliminada correctamente',
        entities: entityDeleted[0] as Entity
      }
    }
  }
}