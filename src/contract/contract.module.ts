import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { HouseModule } from '../house/house.module';

@Module({
  imports:[SequelizeModule.forFeature([Contract]), HouseModule],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
