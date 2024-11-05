import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { InjectModel } from '@nestjs/sequelize';
import { House } from './models/house.model';
import { User } from '../user/models/user.model';
import { FurnishingService } from '../furnishing/furnishing.service';
import { AddRemoveFurnitureDto } from './dto/addRemoveFurniture.dto';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(House) private houseModel: typeof House,
    @InjectModel(User) private userModel: typeof User,
    private readonly furnitureService: FurnishingService,
  ) {}

  async create(createHouseDto: CreateHouseDto) {
    const newHouse = await this.houseModel.create({ ...createHouseDto });
    const furniture = await this.furnitureService.findByName(
      createHouseDto.furniture_value,
    );

    if (!furniture) {
      throw new BadRequestException('Furniture not found');
    }
    await newHouse.$set('furnitures', [furniture.id]);
    await this.userModel.update(
      { is_owner: true },
      { where: { id: createHouseDto.userId } },
    );
    return newHouse;
  }

  findAll() {
    return this.houseModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.houseModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateHouseDto: UpdateHouseDto) {
    const house = await this.houseModel.update(
      { ...updateHouseDto },
      { where: { id }, returning: true },
    );
    return house[1][0];
  }

  remove(id: number) {
    return this.houseModel.destroy({ where: { id } });
  }

  async addFurniture(addRemoveFurnitureDto: AddRemoveFurnitureDto){
    const house = await this.findOne(addRemoveFurnitureDto.houseId)
    const furniture = await this.furnitureService.findByName(addRemoveFurnitureDto.furniture_value)
    if (house && furniture) {
      await house.$add('furnitures', furniture.id);
      await house.save()
      return {message:"Furniture added"}
    }
  }

  async removeFurniture(addRemoveFurnitureDto:AddRemoveFurnitureDto) {
    const house = await this.findOne(addRemoveFurnitureDto.houseId);
    const furniture = await this.furnitureService.findByName(
      addRemoveFurnitureDto.furniture_value,
    );
    if (house && furniture) {
      await house.$remove('furnitures', furniture.id);
      await house.save()
      return {message: "Furniture removed"}
    }
  }
}
