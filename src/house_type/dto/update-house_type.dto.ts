import { PartialType } from '@nestjs/swagger';
import { CreateHouseTypeDto } from './create-house_type.dto';

export class UpdateHouseTypeDto extends PartialType(CreateHouseTypeDto) {}
