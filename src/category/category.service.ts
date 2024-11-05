import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categotyModel: typeof Category) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categotyModel.create(createCategoryDto);
  }

  findAll() {
    return this.categotyModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.categotyModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoty = await this.categotyModel.update(
      { ...updateCategoryDto },
      { where: { id }, returning: true },
    );
    return categoty[1][0];
  }

  remove(id: number) {
    return this.categotyModel.destroy({ where: { id } });
  }
}
