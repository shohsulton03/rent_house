import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment_type.service';
import { PaymentTypeController } from './payment_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentType } from './models/payment_type.model';

@Module({
  imports:[SequelizeModule.forFeature([PaymentType])],
  controllers: [PaymentTypeController],
  providers: [PaymentTypeService],
})
export class PaymentTypeModule {}
