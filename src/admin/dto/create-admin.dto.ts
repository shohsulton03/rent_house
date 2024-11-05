import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class CreateAdminDto {
  @ApiProperty({
    example: 'Sobir Karimov',
    description: 'Admin full_name',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;
0
  @ApiProperty({
    example: 'admin',
    description: 'Admin unique login',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'qwerty12345',
    description: 'Admin password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'qwerty12345',
    description: 'Admin confirm password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: '+998905689789',
    description: 'Admin phone number',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;

  @IsOptional()
  @IsBoolean()
  is_creator:boolean
}
