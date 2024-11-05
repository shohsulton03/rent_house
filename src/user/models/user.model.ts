import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { House } from "../../house/models/house.model";
import { Contract } from "../../contract/models/contract.model";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  hashed_password: string;
  phone_number: string;
  is_active: boolean;
  is_owner: boolean;
}

@Table({ tableName: 'user' })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'User unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Sobir Karimov',
    description: 'User full_name',
  })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: 'User unique email',
  })
  @Column({
    type: DataType.STRING,
    allowNull:false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'hashpassword',
    description: 'User password',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: '+998905689789',
    description: 'User phone number',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  phone_number: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_owner: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;


  @HasMany(() => House)
  houses:House[]

  @HasMany(() => Contract)
  contracts:Contract[]
}
