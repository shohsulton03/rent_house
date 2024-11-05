import { Injectable } from '@nestjs/common';
import { CreateFurnishingDto } from './dto/create-furnishing.dto';
import { UpdateFurnishingDto } from './dto/update-furnishing.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Furnishing } from './models/furnishing.model';

@Injectable()
export class FurnishingService {
  constructor(
    @InjectModel(Furnishing) private furnishingModel: typeof Furnishing,
  ) {}

  create(createFurnishingDto: CreateFurnishingDto) {
    return this.furnishingModel.create(createFurnishingDto);
  }

  findAll() {
    return this.furnishingModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.furnishingModel.findByPk(id, { include: { all: true } });
  }

  async findByName(name: string) {
    return this.furnishingModel.findOne({ where: { name } });
  }

  async update(id: number, updateFurnishingDto: UpdateFurnishingDto) {
    const furniche = await this.furnishingModel.update(
      { ...updateFurnishingDto },
      { where: { id }, returning: true },
    );
    return furniche[1][0];
  }

  remove(id: number) {
    return this.furnishingModel.destroy({ where: { id } });
  }
}
