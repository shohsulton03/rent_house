import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
    example: 'oylik',
    description: 'Bron qilish mudatti (kunkik, oylik)',
  })
  @IsString()
  @IsNotEmpty()
  name:string
}
