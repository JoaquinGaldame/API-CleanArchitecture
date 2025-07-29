import { AuthenticatedRequest } from "@/core/types/Request.interface";
import { DbConnectionKey } from "../db/connections/db-connections";

// Repositorios
import { EntityRepository } from "./entity/entity.repository.impl";



export class RepositoryFactory {
  static createEntityRepository(request: AuthenticatedRequest): EntityRepository{
    const connectionString = request.user?.connection_string as DbConnectionKey ?? '';
    return new EntityRepository(connectionString);
  }
  static createEntityRepository_Connection(connection_string: DbConnectionKey): EntityRepository{
    return new EntityRepository(connection_string);
  }
}