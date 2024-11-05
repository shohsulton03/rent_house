import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { House } from "../../house/models/house.model";

interface ITypeOfBuilding {
    type:string
}

@Table({tableName:"type_of_building"})
export class TypeOfBuilding extends Model<TypeOfBuilding, ITypeOfBuilding> {
  @ApiProperty({
    example: 1,
    description: 'Type Building unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'gishtli',
    description: 'uy qurulish tipi kiritiladi(gishtli, betonli)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @HasMany(() => House)
  houses:House[]
}
