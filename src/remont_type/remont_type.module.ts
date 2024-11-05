import { Module } from '@nestjs/common';
import { RemontTypeService } from './remont_type.service';
import { RemontTypeController } from './remont_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RemontType } from './models/remont_type.model';

@Module({
  imports:[SequelizeModule.forFeature([RemontType])],
  controllers: [RemontTypeController],
  providers: [RemontTypeService],
})
export class RemontTypeModule {}
