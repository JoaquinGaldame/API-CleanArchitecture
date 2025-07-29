import { EntityRepository } from "@/infrastructure/repositories/entity/entity.repository.impl";
import { EntityDTO, DeleteEntityDTO } from "../domain/entity/Entity.dto";
import { mapperToEntityPartial, mapperToEntityDTO } from "../domain/entity/EntityMapper";

export class DeleteEntityUseCase {
  constructor(private entityRepository: EntityRepository) {}

  // Obtener Entidad por Identificador único
  async execute(id: number): Promise<DeleteEntityDTO>{
    const existing = await this.entityRepository.findById(id);

    if(!existing) return {
      message: 'Entidad no encontrada',
      count: 0,
      entity: null
    }

    const entityDeleted = await this.entityRepository.deleteEntity(id);

    if(!entityDeleted) return {
      message: 'Error al Eliminar entidad',
      count: 0
    };
        
    return {
      message: 'Entidad Eliminada con éxito',
      count: entityDeleted.count
    };

  }
}