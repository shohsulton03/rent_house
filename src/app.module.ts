import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { AuthModule } from './auth/auth.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { District } from './district/models/district.model';
import { Region } from './region/models/region.model';
import { RemontTypeModule } from './remont_type/remont_type.module';
import { RemontType } from './remont_type/models/remont_type.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/models/category.model';
import { HouseTypeModule } from './house_type/house_type.module';
import { HouseType } from './house_type/models/house_type.model';
import { TypeOfBuildingModule } from './type_of_building/type_of_building.module';
import { TypeOfBuilding } from './type_of_building/models/type_of_building.entity';
import { PaymentTypeModule } from './payment_type/payment_type.module';
import { PaymentStatusModule } from './payment_status/payment_status.module';
import { PaymentType } from './payment_type/models/payment_type.model';
import { PaymentStatus } from './payment_status/models/payment_status.model';
import { UserModule } from './user/user.module';
import { User } from './user/models/user.model';
import { HouseModule } from './house/house.module';
import { House } from './house/models/house.model';
import { FurnishingModule } from './furnishing/furnishing.module';
import { Furnishing } from './furnishing/models/furnishing.model';
import { HouseFurniture } from './house/models/house_furniture.model';
import { ContractModule } from './contract/contract.module';
import { Contract } from './contract/models/contract.model';
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/models/payment.model';
import { MailModule } from './mail/mail.module';
import { Otp } from './auth/models/otp.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Admin,
        District,
        Region,
        RemontType,
        Category,
        HouseType,
        TypeOfBuilding,
        PaymentType,
        PaymentStatus,
        User,
        House,
        Furnishing,
        HouseFurniture,
        Contract,
        Payment,
        Otp
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    AdminModule,
    AuthModule,
    RegionModule,
    DistrictModule,
    RemontTypeModule,
    CategoryModule,
    HouseTypeModule,
    TypeOfBuildingModule,
    PaymentTypeModule,
    PaymentStatusModule,
    UserModule,
    HouseModule,
    FurnishingModule,
    ContractModule,
    PaymentModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
