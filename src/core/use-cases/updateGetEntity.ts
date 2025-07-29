import { EntityRepository } from "@/infrastructure/repositories/entity/entity.repository.impl";
import { EntityDTO, UpdateEntityDTO } from "../domain/entity/Entity.dto";
import { mapperToEntityPartial, mapperToEntityDTO } from "../domain/entity/EntityMapper";

export class UpdateEntityUseCase {
  constructor(private entityRepository: EntityRepository) {}

  // Actualizar entidad esppecífica por ID
  async execute(id: number, data: UpdateEntityDTO): Promise<{message: string, success: boolean, data: EntityDTO | null}>{

    const existing = await this.entityRepository.findById(id);

    if(!existing) return {
      message: 'Entidad no encontrada',
      success: false,
      data: null
    }

    const entityToPersist = mapperToEntityPartial(data); // Mapeo a schema
        
    const entityUpdated = await this.entityRepository.update(id, entityToPersist);
    
    if(!entityUpdated) return {
      message: 'Error al actualizar Entidad',
      success: false,
      data: null
    }
    
    return {
      message: 'Entidad Actualizada',
      success: true,
      data: mapperToEntityDTO(entityUpdated)
    }
  }
}