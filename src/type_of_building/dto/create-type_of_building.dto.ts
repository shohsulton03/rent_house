import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeOfBuildingDto {
  @ApiProperty({
    example: 'gishtli',
    description: 'uy qurulish tipi kiritiladi(gishtli, betonli)',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
