import { Injectable } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentType } from './models/payment_type.model';

@Injectable()
export class PaymentTypeService {
  constructor(
    @InjectModel(PaymentType) private paymentTypeModel: typeof PaymentType,
  ) {}

  create(createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeModel.create(createPaymentTypeDto);
  }

  findAll() {
    return this.paymentTypeModel.findAll();
  }

  findOne(id: number) {
    return this.paymentTypeModel.findByPk(id);
  }

  async update(id: number, updatePaymentTypeDto: UpdatePaymentTypeDto) {
    const paymentType = await this.paymentTypeModel.update(
      { ...updatePaymentTypeDto },
      { where: { id }, returning: true },
    );
    return paymentType[1][0];
  }

  remove(id: number) {
    return this.paymentTypeModel.destroy({ where: { id } });
  }
}
