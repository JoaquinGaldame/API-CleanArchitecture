import { RequestHandler } from 'express';

// Casos de Uso
import { GetEntityUseCase } from '@/core/use-cases/getEntity';
import { GetEntityByIdUseCase } from '@/core/use-cases/getEntityById';
import { CreateEntityUseCase } from '@/core/use-cases/createEntity';
import { UpdateEntityUseCase } from '@/core/use-cases/updateGetEntity';
import { DeleteEntityUseCase } from '@/core/use-cases/deleteEntity';

// Repository Factory
import { RepositoryFactory } from '@/infrastructure/repositories/Repository.factory';


export const getEntityHandler: RequestHandler = async (req, res) => {
  try {
    
    const repository = RepositoryFactory.createEntityRepository(req);
    
    const getEntities = new GetEntityUseCase(repository);
    
    const result = await getEntities.execute();
    
    if(result.length === 0){
      res.status(204).end();
      return;
    }
    
    res.status(201).json(result);
  
  } catch (error) {
    res.status(400).json({ 
      message: "Error al obtener datos de las Entidades",
      error: error instanceof Error ? error.message : error
    });
    
  }
}


export const getEntityByIdHandler: RequestHandler = async (req, res) => {
  try {
    
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID debe ser un número válido" });
      return;
    }

    const repository = RepositoryFactory.createEntityRepository(req);
    
    const getEntityById = new GetEntityByIdUseCase(repository);
    
    const result = await getEntityById.execute(id);
    
    if(result === null){
      res.status(204).end();
      return;
    }
    
    res.status(201).json(result);
  
  } catch (error) {
    res.status(400).json({ 
      message: "Error al obtener Entidad por ID",
      error: error instanceof Error ? error.message : error
    });
    
  }
}


export const createEntityHandler: RequestHandler = async (req, res) => {
  try {
    const repository = RepositoryFactory.createEntityRepository(req);
    const createEntity = new CreateEntityUseCase(repository);

    const result = await createEntity.execute(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ 
      message: "Error al crear Entidad nueva",
      error: error instanceof Error ? error.message : error
    });
  }
};


export const updateEntityHandler: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID debe ser un número válido" });
      return;
    }

    const repository = RepositoryFactory.createEntityRepository(req);
    const updateEntity = new UpdateEntityUseCase(repository);

    const result = await updateEntity.execute(id, req.body);
    if (!result) {
      res.status(404).json({ message: "Entidad no encontrado" });
      return;
    }
    
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};



export const deleteEntityHandler: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID debe ser un número válido" });
      return;
    }

    const repository = RepositoryFactory.createEntityRepository(req);
    const deleteEntity = new DeleteEntityUseCase(repository);

    const result = await deleteEntity.execute(id);
    if (result.count === 0) {
      res.status(404).json(result);
    }
    
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};