import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { House } from '../../house/models/house.model';
import { User } from '../../user/models/user.model';
import { Payment } from '../../payment/models/payment.model';

interface IcontractAttr {
  houseId: number;
  userId: number;
  date: Date;
  firts_payment: number;
}

@Table({ tableName: 'contract' })
export class Contract extends Model<Contract, IcontractAttr> {
  @ApiProperty({
    example: 1,
    description: 'Contract unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'House unique ID',
  })
  @ForeignKey(() => House)
  @Column({
    type: DataType.INTEGER,
  })
  houseId: number;

  @BelongsTo(() => House)
  house: House;

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

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  date: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
  })
  firts_payment: number;

  @HasMany(() => Payment)
  payments:Payment[]
}
