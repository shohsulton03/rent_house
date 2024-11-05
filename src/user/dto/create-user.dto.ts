import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Sobir Karimov',
    description: 'User full_name',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'admin',
    description: 'User unique email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'qwerty12345',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'qwerty12345',
    description: 'User confirm password',
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: '+998905689789',
    description: 'User phone number',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;
}
