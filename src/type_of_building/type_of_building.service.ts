import { Injectable } from '@nestjs/common';
import { CreateTypeOfBuildingDto } from './dto/create-type_of_building.dto';
import { UpdateTypeOfBuildingDto } from './dto/update-type_of_building.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TypeOfBuilding } from './models/type_of_building.entity';

@Injectable()
export class TypeOfBuildingService {
  constructor(
    @InjectModel(TypeOfBuilding)
    private typeOfBuildingService: typeof TypeOfBuilding,
  ) {}

  create(createTypeOfBuildingDto: CreateTypeOfBuildingDto) {
    return this.typeOfBuildingService.create(createTypeOfBuildingDto);
  }

  findAll() {
    return this.typeOfBuildingService.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.typeOfBuildingService.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateTypeOfBuildingDto: UpdateTypeOfBuildingDto) {
    const type = await this.typeOfBuildingService.update(
      updateTypeOfBuildingDto,
      { where: { id }, returning: true },
    );
    return type[1][0];
  }

  remove(id: number) {
    return this.typeOfBuildingService.destroy({ where: { id } });
  }
}
