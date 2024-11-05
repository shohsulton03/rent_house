import { PartialType } from '@nestjs/swagger';
import { CreateFurnishingDto } from './create-furnishing.dto';

export class UpdateFurnishingDto extends PartialType(CreateFurnishingDto) {}
