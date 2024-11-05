import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { PaymentStatusController } from './payment_status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentStatus } from './models/payment_status.model';

@Module({
  imports:[SequelizeModule.forFeature([PaymentStatus])],
  controllers: [PaymentStatusController],
  providers: [PaymentStatusService],
})
export class PaymentStatusModule {}
