import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateContractDto {
  @ApiProperty({
    example: 1,
    description: 'House unique ID',
  })
  @IsNumber()
  houseId: number;

  @ApiProperty({
    example: 1,
    description: 'User unique ID',
  })
  @IsNumber()
  userId: number;
}
