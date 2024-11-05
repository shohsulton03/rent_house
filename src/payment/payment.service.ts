import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment) private patmentModel: typeof Payment) {}

  create(createPaymentDto: CreatePaymentDto) {
    return this.patmentModel.create(createPaymentDto);
  }

  findAll() {
    return this.patmentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.patmentModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.patmentModel.update(
      { ...updatePaymentDto },
      { where: { id }, returning: true },
    );
    return payment[1][0];
  }

  remove(id: number) {
    return this.patmentModel.destroy({ where: { id } });
  }
}
