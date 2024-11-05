import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript"


interface IRemontTypeAttr{
    type:string
    description:string
}

@Table({ tableName: 'remont_type' })
export class RemontType extends Model<RemontType, IRemontTypeAttr> {
  @ApiProperty({
    example: 1,
    description: 'Remont Type unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'evro',
    description: 'remont turi yoziladi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type: string;

  @ApiProperty({
    example: 'malumot',
    description: "remont turi haqida qo'shimcha ma'lumot",
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;
}
