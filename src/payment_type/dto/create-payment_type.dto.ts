import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentTypeDto {
  @ApiProperty({
    example: 'card',
    description: "to'lov turi yoziladi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
