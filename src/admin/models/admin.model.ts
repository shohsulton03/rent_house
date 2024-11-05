import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAdminCreationAttr {
  full_name: string;
  login: string;
  hashed_password: string;
  phone_number: string;
  is_creator: boolean;
  is_active: boolean;
}

@Table({tableName:"admins"})
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Admin unique ID(autoIncrement)',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Sobir Karimov',
    description: 'Admin full_name',
  })
  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @ApiProperty({
    example: 'admin',
    description: 'Admin unique login',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  login: string;

  @ApiProperty({
    example: 'hashpassword',
    description: 'Admin password',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: '+998905689789',
    description: 'Admin phone number',
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
  is_creator: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
