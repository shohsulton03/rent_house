import { PartialType } from '@nestjs/swagger';
import { CreateRemontTypeDto } from './create-remont_type.dto';

export class UpdateRemontTypeDto extends PartialType(CreateRemontTypeDto) {}
