import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { House } from '../../house/models/house.model';
import { HouseFurniture } from '../../house/models/house_furniture.model';

interface IFurnishingAttr {
  name: string;
}

@Table({ tableName: 'furnishing' })
export class Furnishing extends Model<Furnishing, IFurnishingAttr> {
  @ApiProperty({
    example: 1,
    description: 'Furnishing unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'kreslo',
    description: 'Mebel nomi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;


  @BelongsToMany(() => House, () => HouseFurniture)
  houses:[]
}
