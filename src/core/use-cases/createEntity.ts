import { EntityRepository } from "@/infrastructure/repositories/entity/entity.repository.impl";
import { CreateEntityDTO, EntityDTO } from "../domain/entity/Entity.dto";
import { mapperToEntity, mapperToEntityDTO } from "../domain/entity/EntityMapper";

export class CreateEntityUseCase {
  constructor(private entityRepository: EntityRepository) {}

  // Respuesta óptima: informar error si algo falla en la creación de la entidad
  async execute(data: CreateEntityDTO): Promise<EntityDTO | null>{

    const entityToPersist = mapperToEntity(data); // Mapeo a schema
    
    const entityCreated = await this.entityRepository.create(entityToPersist);

    if(!entityCreated) return null; // Error al crear entidad

    return mapperToEntityDTO(entityCreated);
  }
}