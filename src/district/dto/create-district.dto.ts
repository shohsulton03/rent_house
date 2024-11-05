import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDistrictDto {
  @ApiProperty({
    example: 'district',
    description: 'District nomi kiritiladi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Region Id kiritiladi',
  })
  @IsNumber()
  regionId: number;
}
