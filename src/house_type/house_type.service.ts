import { Injectable } from '@nestjs/common';
import { CreateHouseTypeDto } from './dto/create-house_type.dto';
import { UpdateHouseTypeDto } from './dto/update-house_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { HouseType } from './models/house_type.model';

@Injectable()
export class HouseTypeService {
  constructor(
    @InjectModel(HouseType) private houseTypeService: typeof HouseType,
  ) {}

  create(createHouseTypeDto: CreateHouseTypeDto) {
    return this.houseTypeService.create(createHouseTypeDto);
  }

  findAll() {
    return this.houseTypeService.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.houseTypeService.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateHouseTypeDto: UpdateHouseTypeDto) {
    const house_type = await this.houseTypeService.update(updateHouseTypeDto, {
      where: { id },
      returning: true,
    });
    return house_type[1][0]
  }

  remove(id: number) {
    return this.houseTypeService.destroy({where:{id}})
  }
}
