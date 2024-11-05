import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { HouseType } from '../../house_type/models/house_type.model';
import { Category } from '../../category/models/category.model';
import { Region } from '../../region/models/region.model';
import { District } from '../../district/models/district.model';
import { RemontType } from '../../remont_type/models/remont_type.model';
import { TypeOfBuilding } from '../../type_of_building/models/type_of_building.entity';
import { Furnishing } from '../../furnishing/models/furnishing.model';
import { HouseFurniture } from './house_furniture.model';
import { Contract } from '../../contract/models/contract.model';

interface IHouseAttr {
  userId: number;
  square: number;
  rooms: number;
  floor: number;
  typeId: number;
  categoryId: number;
  regionId: number;
  districtId: number;
  description: string;
  remont_typeId: number;
  comission: number;
  price: number;
  layout: 'alohida' | 'aralash' | 'aralash-alohida';
  sanuzel: 'separate' | 'combined';
  type_of_buildingId: number;
  is_booking: boolean;
}

@Table({ tableName: 'house' })
export class House extends Model<House, IHouseAttr> {
  @ApiProperty({
    example: 1,
    description: 'House unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'User unique ID',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({
    example: 100,
    description: 'house square',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  square: number;

  @ApiProperty({
    example: 4,
    description: 'house rooms',
  })
  @Column({
    type: DataType.INTEGER,
  })
  rooms: number;

  @ApiProperty({
    example: 3,
    description: 'house floor',
  })
  @Column({
    type: DataType.INTEGER,
  })
  floor: number;

  @ApiProperty({
    example: 1,
    description: 'HouseType unique ID',
  })
  @ForeignKey(() => HouseType)
  @Column({
    type: DataType.INTEGER,
  })
  typeId: number;

  @BelongsTo(() => HouseType)
  type: HouseType;

  @ApiProperty({
    example: 1,
    description: 'Category unique ID',
  })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @ApiProperty({
    example: 1,
    description: 'Region unique ID',
  })
  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  regionId: number;

  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({
    example: 1,
    description: 'District unique ID',
  })
  @ForeignKey(() => District)
  @Column({
    type: DataType.INTEGER,
  })
  districtId: number;

  @BelongsTo(() => District)
  district: District;

  @ApiProperty({
    example: 'Somethink about house',
    description: 'Description about your house',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({
    example: 1,
    description: 'RemontType unique ID',
  })
  @ForeignKey(() => RemontType)
  @Column({
    type: DataType.INTEGER,
  })
  remont_typeId: number;

  @BelongsTo(() => RemontType)
  remont_type: RemontType;

  @ApiProperty({
    example: 10,
    description: 'Commission to help for rent',
  })
  @Column({
    type: DataType.DECIMAL(3, 1),
  })
  comission: number;

  @ApiProperty({
    example: 100,
    description: 'Rent price house',
  })
  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  price: number;

  @ApiProperty({
    example: 'alohida',
    description: 'Uy planirovla strkukturasi',
  })
  @Column({
    type: DataType.ENUM('alohida', 'aralash', 'aralash-alohida'),
  })
  layout: string;

  @ApiProperty({
    example: 'combined',
    description: 'Sanuzel qanaqaligi',
  })
  @Column({
    type: DataType.ENUM('separate', 'combined'),
    allowNull: true,
  })
  sanuzel: string;

  @ApiProperty({
    example: 1,
    description: 'TypeOfBuilding unique ID',
  })
  @ForeignKey(() => TypeOfBuilding)
  @Column({
    type: DataType.INTEGER,
  })
  type_of_buildingId: number;

  @BelongsTo(() => TypeOfBuilding)
  type_of_building: TypeOfBuilding;

  @ApiProperty({
    example: true,
    description: 'Uy arendaga berilganmi yoki yoqligi uchun',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_booking: boolean;

  @BelongsToMany(() => Furnishing, () => HouseFurniture)
  furnitures:Furnishing[]

  @HasMany(() => Contract)
  contracts:Contract[]
}
