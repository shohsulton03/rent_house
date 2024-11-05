import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRemontTypeDto {
  @ApiProperty({
    example: 'evro',
    description: 'remont turi yoziladi',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example: 'malumot',
    description: "remont turi haqida qo'shimcha ma'lumot",
  })
  @IsOptional()
  @IsString()
  description: string;
}
