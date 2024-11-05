import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFurnishingDto {
  @ApiProperty({
    example: 'kreslo',
    description: 'Mebel nomi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
