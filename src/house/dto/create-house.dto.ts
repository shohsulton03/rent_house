import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHouseDto {
  @ApiProperty({ example: 1, description: 'User unique ID' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 100, description: 'House square in square meters' })
  @IsNumber()
  square: number;

  @ApiProperty({ example: 4, description: 'Number of rooms in the house' })
  @IsNumber()
  rooms: number;

  @ApiProperty({ example: 3, description: 'Floor of the house' })
  @IsNumber()
  floor: number;

  @ApiProperty({ example: 1, description: 'HouseType unique ID' })
  @IsNumber()
  typeId: number;

  @ApiProperty({ example: 1, description: 'Category unique ID' })
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: 1, description: 'Region unique ID' })
  @IsNumber()
  regionId: number;

  @ApiProperty({ example: 1, description: 'District unique ID' })
  @IsNumber()
  districtId: number;

  @ApiProperty({
    example: 'Some details about the house',
    description: 'Description about your house',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1, description: 'RemontType unique ID' })
  @IsNumber()
  remont_typeId: number;

  @ApiProperty({ example: 10, description: 'Commission for helping with rent' })
  @IsNumber()
  comission: number;

  @ApiProperty({ example: 100, description: 'Rental price of the house' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'alohida',
    description: 'House layout structure',
    enum: ['alohida', 'aralash', 'aralash-alohida'],
  })
  @IsString()
  @IsNotEmpty()
  layout: 'alohida' | 'aralash' | 'aralash-alohida';

  @ApiProperty({
    example: 'combined',
    description: 'Type of bathroom',
    enum: ['separate', 'combined'],
  })
  @IsString()
  @IsNotEmpty()
  sanuzel: 'separate' | 'combined';

  @ApiProperty({ example: 1, description: 'TypeOfBuilding unique ID' })
  @IsNumber()
  type_of_buildingId: number;

  @ApiProperty({ example: "divan", description: 'Mebel kiritiladi' })
  @IsString()
  @IsNotEmpty()
  furniture_value: string;
}
