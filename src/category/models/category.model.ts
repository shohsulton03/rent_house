import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { House } from "../../house/models/house.model";

interface ICategoryAttr{
    name:string
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, ICategoryAttr> {
  @ApiProperty({
    example: 1,
    description: 'Categoty unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'oylik',
    description: 'Bron qilish mudatti (kunkik, oylik)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => House)
  houses:House[]
}
