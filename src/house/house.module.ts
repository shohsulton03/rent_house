import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { House } from './models/house.model';
import { User } from '../user/models/user.model';
import { Furnishing } from '../furnishing/models/furnishing.model';
import { HouseFurniture } from './models/house_furniture.model';
import { FurnishingModule } from '../furnishing/furnishing.module';
import { Region } from '../region/models/region.model';
import { District } from '../district/models/district.model';

@Module({
  imports:[SequelizeModule.forFeature([House, User, Furnishing, HouseFurniture, Region, District]), FurnishingModule],
  controllers: [HouseController],
  providers: [HouseService],
  exports:[HouseService]
})
export class HouseModule {}
