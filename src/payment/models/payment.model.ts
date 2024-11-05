import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { PaymentType } from '../../payment_type/models/payment_type.model';
import { Contract } from '../../contract/models/contract.model';
import { PaymentStatus } from '../../payment_status/models/payment_status.model';

interface IPaymentAttr {
  contractId: number;
  typeId: number;
  statusId: number;
  date: Date;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, IPaymentAttr> {
  @ApiProperty({
    example: 1,
    description: 'Payment unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Contract unique ID',
  })
  @ForeignKey(() => Contract)
  @Column({
    type: DataType.INTEGER,
  })
  contractId: number;

  @BelongsTo(() => Contract)
  contract: Contract;

  @ApiProperty({
    example: 1,
    description: 'Payment type unique ID',
  })
  @ForeignKey(() => PaymentType)
  @Column({
    type: DataType.INTEGER,
  })
  typeId: number;

  @BelongsTo(() => PaymentType)
  type: PaymentType;

  @ApiProperty({
    example: 1,
    description: 'Payment status unique ID',
  })
  @ForeignKey(() => PaymentStatus)
  @Column({
    type: DataType.INTEGER,
  })
  statusId: number;

  @BelongsTo(() => PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({
    example: '2024-11-04T08:55:00.000Z',
    description: 'Date of the payment',
  })
  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  date: Date;
}
