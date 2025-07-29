import { Entity, InsertEntity } from "@/infrastructure/db/schemas";
import { CreateEntityDTO, EntityDTO, UpdateEntityDTO } from "./Entity.dto";
import { formatDate } from "../Services/Helpers";

/**
 * Convierte un CreateUserDTO en un objeto compatible con el schema User para la base de datos.
 * Este mapeo garantiza valores por defecto coherentes y tipos consistentes.
 * 
 * @param {CreateUserDTO} dto - Datos del usuario desde la capa de aplicación
 * @returns {Omit<User, 'id'>} Objeto User listo para persistencia
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */
export function mapperToEntity(dto: CreateEntityDTO): InsertEntity {
  return {
    name: dto.name,
    measure: dto.measure,
    hight: dto.hight,
    composition_id: dto.composition_id,
    type_id: dto.type_id,
    cost: dto.cost,
    life: dto.life,
    state_id: dto.state_id,
    eliminated: dto.eliminated,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined
  };
}


/**
 * Convierte un objeto compatible con el schema User de la base de datos en una entidad UserDTO
 * Este mapeo garantiza valores por defecto coherentes y tipos consistentes.
 * 
 * @param {User} user - Objeto User listo para persistencia
 * @returns {UserDTO} - Datos del usuario desde la capa de aplicación
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */
export function mapperToEntityDTO(entity: Entity, formatoFecha: 1 | 2 = 1): EntityDTO {
  return {
    id: entity.id,
    name: entity.name,
    measure: entity.measure,
    hight: entity.hight,
    composition_id: entity.composition_id,
    type_id: entity.type_id,
    cost: entity.cost,
    life: entity.life,
    state_id: entity.state_id,
    updatedAt: formatDate(entity.updatedAt, formatoFecha)
  };
}


/**
 * Convierte un objeto compatible con schema Partial<User> de la base de datos en una entidad UpdateEntityDTO
 * Este mapeo garantiza valores por defecto coherentes y tipos consistentes.
 * 
 * @param {UpdateEntityDTO} dto - Objeto User listo para persistencia
 * @returns {Partial<User>} - Datos del usuario desde la capa de aplicación
 * @security ISO27001: A.14.1 - Seguridad en el desarrollo
 * @security ISO27001: A.14.2.5 - Principios de ingeniería para sistemas seguros
 */
export function mapperToEntityPartial(dto: UpdateEntityDTO): Partial<Entity> {
  return {
    name: dto.name,
    measure: dto.measure,
    hight: dto.hight,
    composition_id: dto.composition_id,
    type_id: dto.type_id,
    cost: dto.cost,
    life: dto.life,
    state_id: dto.state_id,
    eliminated: dto.eliminated,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined
  };
}