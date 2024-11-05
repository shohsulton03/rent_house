import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddRemoveFurnitureDto {
  @ApiProperty({
    example: 1,
    description: 'House ID kiritiladi',
  })
  @IsNumber()
  readonly houseId: number;

  @ApiProperty({ example: 'divan', description: 'Mebel kiritiladi' })
  @IsString()
  @IsNotEmpty()
  readonly furniture_value: string;
}