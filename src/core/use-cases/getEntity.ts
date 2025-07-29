import { EntityRepository } from "@/infrastructure/repositories/entity/entity.repository.impl";
import { EntityDTO } from "../domain/entity/Entity.dto";
import {  mapperToEntityDTO } from "../domain/entity/EntityMapper";

export class GetEntityUseCase {
  constructor(private entityRepository: EntityRepository) {}

  // Obtener Listado de la Entidad
  async execute(): Promise<EntityDTO[]>{

    const entities = await this.entityRepository.findAll();

    if(!entities) return []; // Error al crear entidad

    return entities.map(entity => mapperToEntityDTO(entity, 1));
  }
}