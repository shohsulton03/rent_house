import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: 'Contract unique ID',
  })
  @IsNumber()
  contractId: number;

  @ApiProperty({
    example: 1,
    description: 'Payment type unique ID',
  })
  @IsNumber()
  typeId: number;

  @ApiProperty({
    example: 1,
    description: 'Payment status unique ID',
  })
  @IsNumber()
  statusId: number;

  @ApiProperty({
    example: '2024-11-04T08:55:00.000Z',
    description: 'Date of the payment',
  })
  @IsOptional()
  @IsDateString()
  date: Date;
}
