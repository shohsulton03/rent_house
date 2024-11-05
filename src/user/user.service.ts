import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const condidate = await this.userModel.findOne({
        where: { email: createUserDto.email },
      });

      if (condidate) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }

      if (createUserDto.password !== createUserDto.confirm_password) {
        throw new BadRequestException('Parrollar mos emas');
      }

      const hashed_password = await hash(createUserDto.password, 7);
      const newUser = await this.userModel.create({
        ...createUserDto,
        hashed_password,
      });

      return newUser;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { include: { all: true } });
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password && updateUserDto.confirm_password) {
      if (updateUserDto.password !== updateUserDto.confirm_password) {
        throw new BadRequestException('Parollar mos emas');
      }
      const hashed_password = await hash(updateUserDto.password, 7);
      const user = await this.userModel.update(
        { ...updateUserDto },
        { where: { id }, returning: true },
      );
      return user[1][0];
    }
    const updatedUser = await this.userModel.update(
      { ...updateUserDto },
      { where: { id }, returning: true },
    );
    return updatedUser[1][0];
  }

  async updateUserByEmail(email: string) {
    const user = await this.userModel.update(
      { is_active: true },
      { where: { email }, returning: true },
    );
    return user[1][0]
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.userModel.update(
      { hashed_refresh_token },
      { where: { id }, returning: true },
    );
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
