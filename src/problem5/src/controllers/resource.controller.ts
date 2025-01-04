import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route } from "tsoa";
import { inject, provideSingleton } from "../middlewares/inversify/util";
import { ResourceCreateDto, ResourceUpdateDto } from "../dtos";
import { ResourceService } from "../services";

@Route("resources")
@provideSingleton(ResourceController)
export class ResourceController extends Controller {
  @inject(ResourceService) private resourceService: ResourceService;

  @Get()
  async getResources(@Query() query?: string) {
    return this.resourceService.getResources(query);
  }

  @Post()
  async createResource(@Body() data: ResourceCreateDto) {
    return this.resourceService.createResource(data);
  }

  @Put('{id}')
  async updateResource(@Path() id: string, @Body() data: ResourceUpdateDto) {
    return this.resourceService.updateResource(id, data);
  }

  @Get('{id}')
  async getResource(@Path() id: string) {
    return this.resourceService.getResource(id);
  }

  @Delete('{id}')
  async deleteResource(@Path() id: string) {
    return this.resourceService.deleteResource(id);
  }
}