import { Module } from '@nestjs/common';
import { FurnishingService } from './furnishing.service';
import { FurnishingController } from './furnishing.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Furnishing } from './models/furnishing.model';

@Module({
  imports: [SequelizeModule.forFeature([Furnishing])],
  controllers: [FurnishingController],
  providers: [FurnishingService],
  exports: [FurnishingService],
})
export class FurnishingModule {}
