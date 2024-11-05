import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Otp]),
    AdminModule,
    UserModule,
    MailModule,
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
