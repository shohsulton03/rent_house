import { Injectable } from '@nestjs/common';
import { CreateRemontTypeDto } from './dto/create-remont_type.dto';
import { UpdateRemontTypeDto } from './dto/update-remont_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { RemontType } from './models/remont_type.model';

@Injectable()
export class RemontTypeService {
  constructor(
    @InjectModel(RemontType) private remontTypeModel: typeof RemontType,
  ) {}

  create(createRemontTypeDto: CreateRemontTypeDto) {
    return this.remontTypeModel.create(createRemontTypeDto);
  }

  findAll() {
    return this.remontTypeModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.remontTypeModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateRemontTypeDto: UpdateRemontTypeDto) {
    const remont = await this.remontTypeModel.update(updateRemontTypeDto, {
      where: { id },
      returning: true,
    });
    return remont[1][0];
  }

  remove(id: number) {
    return this.remontTypeModel.destroy({ where: { id } });
  }
}
