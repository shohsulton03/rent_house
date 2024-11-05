import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { HouseService } from '../house/house.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract) private contractModel: typeof Contract,
    private readonly houseService: HouseService,
  ) {}

  async create(createContractDto: CreateContractDto) {
    const house = await this.houseService.findOne(createContractDto.houseId);
    if (!house) {
      throw new BadRequestException('House not found');
    }
    if (house.is_booking) {
      throw new BadRequestException("Bu uyda ijarachilar mavjud")
    }
    const first_price = Number(house.price) + (house.price * house.comission / 100);
    const newContract = await this.contractModel.create({...createContractDto, firts_payment:first_price});
    house.is_booking = true
    await house.save()
    return newContract;
  }

  findAll() {
    return this.contractModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.contractModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    if (updateContractDto.houseId) {
      const house = await this.houseService.findOne(updateContractDto.houseId);
      if (!house) {
        throw new BadRequestException('House not found');
      }
      if (house.is_booking) {
        throw new BadRequestException('Bu uyda ijarachilar mavjud');
      }
      const first_price = Number(house.price) + (house.price * house.comission / 100);
      const contract = await this.contractModel.update(
        { ...updateContractDto, firts_payment: first_price },
        {
          where: { id },
          returning: true,
        },
        
      );
      house.is_booking = true;
      await house.save();
      return contract[1][0];
    }
    const contract = await this.contractModel.update(updateContractDto, {
      where: { id },
      returning: true,
    });
    
    return contract[1][0];
  }

  remove(id: number) {
    return this.contractModel.destroy({ where: { id } });
  }
}
