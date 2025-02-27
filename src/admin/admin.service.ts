import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const candidate = await this.adminModel.findOne({
        where: { login: createAdminDto.login },
      });

      if (candidate) {
        throw new BadRequestException('Bunday foydalanuvchi mavjud');
      }

      if (createAdminDto.password !== createAdminDto.confirm_password) {
        throw new BadRequestException('Parrollar mos emas');
      }

      const hashed_password = await hash(createAdminDto.password, 7);
      const newAdmin = await this.adminModel.create({
        ...createAdminDto,
        hashed_password,
      });
      return newAdmin;
    } catch (error) {
      console.log(error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new BadRequestException({
          message: 'Phone number already exists.',
        });
      } else {
        throw new InternalServerErrorException({
          message: 'An internal server error occurred.',
        });
      }
    }
  }

  findAll() {
    return this.adminModel.findAll();
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  async findByLogin(login: string) {
    return this.adminModel.findOne({ where: { login } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.password && updateAdminDto.confirm_password) {
      if (updateAdminDto.password !== updateAdminDto.confirm_password) {
        throw new BadRequestException('Parrollar mos emas');
      }
      const hashed_password = await hash(updateAdminDto.password, 7);
      const hashedadmin = await this.adminModel.update(
        { ...updateAdminDto, hashed_password },
        { where: { id }, returning: true },
      );
      return hashedadmin[1][0];
    }
    const admin = await this.adminModel.update(
      { ...updateAdminDto },
      { where: { id }, returning: true },
    );
    return admin[1][0];
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.adminModel.update(
      { hashed_refresh_token },
      { where: { id }, returning: true },
    );
  }

  remove(id: number) {
    return this.adminModel.destroy({ where: { id } });
  }
}
