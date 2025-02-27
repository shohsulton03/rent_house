import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { HouseModule } from '../house/house.module';

@Module({
  imports:[SequelizeModule.forFeature([User]), JwtModule, HouseModule],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
