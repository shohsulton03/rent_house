import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    example: 'region',
    description: 'Region kiritiladi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
