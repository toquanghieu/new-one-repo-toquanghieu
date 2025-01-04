import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ResourceStatus } from "../../enums";
export class ResourceUpdateDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsEnum(ResourceStatus)
  status: ResourceStatus
}
