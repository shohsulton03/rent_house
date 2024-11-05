import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/models/region.model";
import { House } from "../../house/models/house.model";

interface IDistrictCreationAttr{
    name:string,
    regionId:number
}

@Table({tableName:"district"})
export class District extends Model<District, IDistrictCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'District unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'district',
    description: 'District nomi kiritiladi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example:1,
    description:"Region Id kiritiladi"
  })
  @ForeignKey(()=>Region)
  @Column({
    type:DataType.INTEGER
  })
  regionId:number

  @BelongsTo(()=>Region)
  region:Region

  @HasMany(() => House)
  houses:House[]
}