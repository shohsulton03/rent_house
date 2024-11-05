import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Payment } from "../../payment/models/payment.model";


interface IPaymentStatusAttr{
    name:string
}

@Table({ tableName: 'payment_status' })
export class PaymentStatus extends Model<PaymentStatus, IPaymentStatusAttr> {
  @ApiProperty({
    example: 1,
    description: 'Payment Statusi unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'card',
    description: "to'lov statusi yoziladi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @HasMany(() => Payment)
  payments:Payment[]
}
