import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHouseTypeDto {
  @ApiProperty({
    example: 'hovli',
    description: 'uy turlari kiritiladi(hovli, oficce, kvartira)',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
