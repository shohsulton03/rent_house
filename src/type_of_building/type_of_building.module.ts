import { Module } from '@nestjs/common';
import { TypeOfBuildingService } from './type_of_building.service';
import { TypeOfBuildingController } from './type_of_building.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TypeOfBuilding } from './models/type_of_building.entity';

@Module({
  imports:[SequelizeModule.forFeature([TypeOfBuilding])],
  controllers: [TypeOfBuildingController],
  providers: [TypeOfBuildingService],
})
export class TypeOfBuildingModule {}
