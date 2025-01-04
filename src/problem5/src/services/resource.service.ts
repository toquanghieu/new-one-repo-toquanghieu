import { inject } from "inversify";
import { ResourceRepository } from "../repositories";
import { ResourceCreateDto, ResourceUpdateDto } from "../dtos";
import { Resource } from "../entities";
import { DeleteResult, FindManyOptions, Like, TypeORMError } from "typeorm";
import { provideSingleton } from "../middlewares/inversify/util";
import { ApplicationError } from "../middlewares/error/error";

@provideSingleton(ResourceService)
export class ResourceService {
  @inject(ResourceRepository)
  private readonly resourceRepository: ResourceRepository
  async createResource(data: ResourceCreateDto): Promise<Resource> {
    return this.resourceRepository.save(data);
  }

  async updateResource(id: string, data: ResourceUpdateDto): Promise<Resource> {
    await this.checkResourceExists(id);
    return this.resourceRepository.save({ id, ...data });
  }

  async deleteResource(id: string): Promise<DeleteResult> {
    await this.checkResourceExists(id);
    return this.resourceRepository.delete(id);
  }

  async getResource(id: string): Promise<Resource | null> {
    await this.checkResourceExists(id);
    return this.resourceRepository.findOne({ where: { id } });
  }

  async getResources(query?: string): Promise<Resource[]> {
    let findOptions: FindManyOptions<Resource> | undefined = undefined;
    if (query) {
      findOptions = {
        where: [
          { name: Like(`%${query}%`) },
          { description: Like(`%${query}%`) },
        ],
      };
    }
    return this.resourceRepository.find(findOptions);
  }

  async checkResourceExists(id: string) {
    await this.resourceRepository.findOneByOrFail({ id }).catch((err: TypeORMError) => {
      throw ApplicationError.fromORMError(err);
    });
  }
}