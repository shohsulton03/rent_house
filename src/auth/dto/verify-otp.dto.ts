import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: 'hashed verification key',
    description: 'You take verification_key in sugnup details',
  })
  @IsString()
  @IsNotEmpty()
  verification_key: string;

  @ApiProperty({
    example: '1478',
    description: 'Otp send your email',
  })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'otp sended email',
  })
  @IsEmail()
  email: string;
}
