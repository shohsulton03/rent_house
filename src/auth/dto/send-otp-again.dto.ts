import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendOtpAgainDto {
  @ApiProperty({
    example: 'user@gmail.com',
    description: 'user email',
  })
  @IsEmail()
  email: string;
}
