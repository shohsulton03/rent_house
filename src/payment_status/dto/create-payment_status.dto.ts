import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentStatusDto {
  @ApiProperty({
    example: 'card',
    description: "to'lov statusi yoziladi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
