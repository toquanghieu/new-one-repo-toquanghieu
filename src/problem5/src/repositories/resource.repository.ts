import { Repository } from "typeorm";
import { Resource } from "../entities";
import { provideSingleton } from "../middlewares/inversify/util";
import dataSource from "../infrastructure/typeorm/connection";

@provideSingleton(ResourceRepository)
export class ResourceRepository extends Repository<Resource>{
  constructor() {
    super(Resource, dataSource.manager, dataSource.createQueryRunner());
  }
}