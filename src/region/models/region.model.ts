import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { District } from '../../district/models/district.model';
import { House } from '../../house/models/house.model';

interface IRegionCreationAttr {
  name: string;
}

@Table({ tableName: 'region' })
export class Region extends Model<Region, IRegionCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Region unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'region',
    description: 'Region nomi kiritiladi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => District)
  disrticts: District;

  @HasMany(() => House)
  houses:House[]
}
