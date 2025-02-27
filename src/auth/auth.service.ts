import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { compare, hash } from 'bcrypt';
import { Admin } from '../admin/models/admin.model';
import { Tokens } from '../common/types';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Response } from 'express';
import { SignInAdminDto, SignInUserDto } from './dto';
import { UserService } from '../user/user.service';
import { User } from '../user/models/user.model';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { generateOTP } from '../common/helpers/generate-otp';
import { MailService } from '../mail/mail.service';
import { InjectModel } from '@nestjs/sequelize';
import { Otp } from './models/otp.model';
import { AddMinutesToDate } from '../common/helpers/addMinutes';
import * as uuid from 'uuid';
import { timestamp } from 'rxjs';
import { decode, encode } from '../common/helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SendOtpAgainDto } from './dto/send-otp-again.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Otp) private otpModel: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  // ------------------------- Admin Auth --------------------------------

  async generateAdminTokens(admin: Admin): Promise<Tokens> {
    const payload = {
      id: admin.id,
      login: admin.login,
      is_creator: admin.is_creator,
      is_active: admin.is_active,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_ADMIN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateAdminRefreshToken(id: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);
    await this.adminService.updateRefreshToken(id, hashed_refresh_token);
  }

  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const newAdmin = await this.adminService.create(createAdminDto);

    if (!newAdmin) {
      throw new InternalServerErrorException("Yangi Admin qo'shishda xatolik");
    }

    const tokens = await this.generateAdminTokens(newAdmin);
    await this.updateAdminRefreshToken(newAdmin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return { id: newAdmin.id, access_token: tokens.access_token };
  }

  async signInAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    const admin = await this.adminService.findByLogin(signInAdminDto.login);

    if (!admin) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    const validPassword = await compare(
      signInAdminDto.password,
      admin.hashed_password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    admin.is_active = true;
    await admin.save();

    const tokens = await this.generateAdminTokens(admin);
    await this.updateAdminRefreshToken(admin.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return {
      message: 'Admin sign in succesfully',
      id: admin.id,
      access_token: tokens.access_token,
    };
  }

  async signOutAdmin(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
      });
      const admin = await this.adminService.findByLogin(payload.login);
      if (!admin) {
        throw new BadRequestException('Invalid refresh token');
      }
      admin.is_active = false;
      admin.hashed_refresh_token = null;
      admin.save();

      res.clearCookie('refresh_token');

      return { message: 'Admin sign out' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async refreshAdminToken(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
      });
      const admin = await this.adminService.findByLogin(payload.login);
      if (!admin) {
        throw new BadRequestException('Invalid refresh token');
      }

      const validRefreshToken = await compare(
        refresh_token,
        admin.hashed_refresh_token,
      );

      if (!validRefreshToken) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const tokens = await this.generateAdminTokens(admin);
      await this.updateAdminRefreshToken(admin.id, tokens.refresh_token);
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.COOKIE_TIME,
        httpOnly: true,
      });

      return {
        message: 'Token refreshed successfully',
        id: admin.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  // ------------------------- User Auth -----------------------
  async generateUserTokens(user: User): Promise<Tokens> {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateUserRefreshToken(id: number, refresh_token: string) {
    const hashed_refresh_token = await hash(refresh_token, 7);
    await this.userService.updateRefreshToken(id, hashed_refresh_token);
  }

  async signUpUser(createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);

    if (!newUser) {
      throw new InternalServerErrorException("Yangi Admin qo'shishda xatolik");
    }

    const OTP = generateOTP();
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { email: createUserDto.email } });

    const newOtp = await this.otpModel.create({
      id: uuid.v4(),
      otp: OTP,
      expiration_time,
      email: createUserDto.email,
    });
    const details = {
      timestamp: now,
      email: createUserDto.email,
      otp_id: newOtp.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    try {
      await this.mailService.sendMail(newUser, OTP);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Xat yuborishda xatolik');
    }

    return {
      id: newUser.id,
      details: encodedData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, res: Response) {
    const currentDate = new Date();
    const decodedData = await decode(verifyOtpDto.verification_key);
    const details = JSON.parse(decodedData);
    if (details.email !== verifyOtpDto.email) {
      throw new BadRequestException("OTP didn't send this email");
    }
    const resultOtp = await this.otpModel.findOne({
      where: { id: details.otp_id },
    });

    if (!resultOtp) {
      throw new BadRequestException('There is no such otp');
    }
    if (resultOtp.verified) {
      throw new BadRequestException('This OTP has been verified before');
    }
    if (resultOtp.expiration_time < currentDate) {
      throw new BadRequestException('This OTP has expired');
    }
    if (resultOtp.otp !== verifyOtpDto.otp) {
      throw new BadRequestException('OTP is not eligible');
    }
    const user = await this.userService.updateUserByEmail(verifyOtpDto.email);
    if (!user) {
      throw new BadRequestException('No such user exists');
    }
    await this.otpModel.update(
      { verified: true },
      { where: { id: details.otp_id } },
    );

    const tokens = await this.generateUserTokens(user);
    await this.updateUserRefreshToken(user.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return {
      message: 'User activated',
      id: user.id,
      access_token: tokens.access_token,
      is_active: user.is_active,
    };
  }

  async sendOtpAgain(sendOtpAgainDto: SendOtpAgainDto) {
    try {
      const user = await this.userService.findByEmail(sendOtpAgainDto.email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.is_active) {
        return { message: 'User already activated' };
      }
      const OTP = generateOTP();
      const now = new Date();
      const expiration_time = AddMinutesToDate(now, 5);
      await this.otpModel.destroy({ where: { email: sendOtpAgainDto.email } });

      const newOtp = await this.otpModel.create({
        id: uuid.v4(),
        otp: OTP,
        expiration_time,
        email: sendOtpAgainDto.email,
      });
      const details = {
        timestamp: now,
        email: sendOtpAgainDto.email,
        otp_id: newOtp.id,
      };

      const encodedData = await encode(JSON.stringify(details));

      try {
        await this.mailService.sendMail(user, OTP);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException('Xat yuborishda xatolik');
      }

      return { message: 'OTP sended your email address', details: encodedData };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error in send otp again');
    }
  }

  async signInUser(signInUserDto: SignInUserDto, res: Response) {
    const user = await this.userService.findByEmail(signInUserDto.email);

    if (!user) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    const validPassword = await compare(
      signInUserDto.password,
      user.hashed_password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Email or Password incrrect');
    }

    user.is_active = true;
    await user.save();

    const tokens = await this.generateUserTokens(user);
    await this.updateUserRefreshToken(user.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.COOKIE_TIME,
      httpOnly: true,
    });

    return {
      message: 'User sign in succesfully',
      id: user.id,
      access_token: tokens.access_token,
    };
  }

  async signOutUser(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }
      user.is_active = false;
      user.hashed_refresh_token = null;
      user.save();

      res.clearCookie('refresh_token');

      return { message: 'User sign  out' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async refreshUserToken(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      const user = await this.userService.findByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }

      const validRefreshToken = await compare(
        refresh_token,
        user.hashed_refresh_token,
      );

      if (!validRefreshToken) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const tokens = await this.generateUserTokens(user);
      await this.updateUserRefreshToken(user.id, tokens.refresh_token);
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.COOKIE_TIME,
        httpOnly: true,
      });

      return {
        message: 'Token refreshed successfully',
        id: user.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
