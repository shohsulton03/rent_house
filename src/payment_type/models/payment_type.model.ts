import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Payment } from "../../payment/models/payment.model";

interface IPaymentTypeAttr{
    name:string
}


@Table({ tableName: 'payment_type' })
export class PaymentType extends Model<PaymentType, IPaymentTypeAttr> {
  @ApiProperty({
    example: 1,
    description: 'Payment Type unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'card',
    description: "to'lov turi yoziladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Payment)
  payments:Payment[]
}
