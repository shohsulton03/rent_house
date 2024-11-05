import { PartialType } from '@nestjs/swagger';
import { CreateTypeOfBuildingDto } from './create-type_of_building.dto';

export class UpdateTypeOfBuildingDto extends PartialType(CreateTypeOfBuildingDto) {}
