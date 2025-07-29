import { IRepository } from "../IRepository";
import { Entity } from "@/infrastructure/db/schemas";

/**
 * @fileoverview Interfaz para el repositorio de la Entidad Específica.
 * @module core/repositories/Entity/Entity.repository
 * @version 1.0.0
 * @license TireControl Proprietary
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 */

export interface IEntityRepository extends IRepository<Entity, number> {
  // Interfaces personalizadas para la Entidad específica
}