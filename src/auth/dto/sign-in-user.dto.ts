import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({
    example: 'user',
    description: 'User unique email',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'qwerty12345',
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
