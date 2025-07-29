import { EntityRepository } from "@/infrastructure/repositories/entity/entity.repository.impl";
import { EntityDTO, UpdateEntityDTO } from "../domain/entity/Entity.dto";
import { mapperToEntityPartial, mapperToEntityDTO } from "../domain/entity/EntityMapper";

export class GetEntityByIdUseCase {
  constructor(private entityRepository: EntityRepository) {}

  // Obtener Entidad por Identificador único
  async execute(id: number): Promise<EntityDTO | null>{

    const existing = await this.entityRepository.findById(id);

    if(!existing) return null;

    const entityDTO = mapperToEntityDTO(existing); // Mapeo a DTO
        
    return entityDTO;
  }
}