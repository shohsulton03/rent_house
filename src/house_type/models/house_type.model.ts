import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { House } from "../../house/models/house.model";

interface IHouseTypeattr{
    name:string
}

@Table({ tableName: 'house_type' })
export class HouseType extends Model<HouseType, IHouseTypeattr> {
  @ApiProperty({
    example: 1,
    description: 'HouseType unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'hovli',
    description: 'uy turlari kiritiladi(hovli, oficce, kvartira)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;


  @HasMany(() => House)
  houses:House[]
}
