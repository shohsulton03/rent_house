import { Module } from '@nestjs/common';
import { HouseTypeService } from './house_type.service';
import { HouseTypeController } from './house_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HouseType } from './models/house_type.model';

@Module({
  imports:[SequelizeModule.forFeature([HouseType])],
  controllers: [HouseTypeController],
  providers: [HouseTypeService],
})
export class HouseTypeModule {}
