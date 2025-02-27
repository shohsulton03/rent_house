import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInAdminDto, SignInUserDto } from './dto';
import { CookieGetter } from '../common/decorators';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { SendOtpAgainDto } from './dto/send-otp-again.dto';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminCreatorGuard } from '../common/guards/admin-creator.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register new Admin' })
  @ApiResponse({
    status: 201,
    description: 'Registered',
    type: Object,
  })
  @UseGuards(AdminCreatorGuard)
  @UseGuards(AdminGuard)
  @Post('signup-admin')
  async signUpAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUpAdmin(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Sign in Admin' })
  @ApiResponse({
    status: 200,
    description: 'Sign in',
    type: Object,
  })
  @HttpCode(200)
  @Post('signin-admin')
  async signInAdmin(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInAdmin(signInAdminDto, res);
  }

  @ApiOperation({ summary: 'Sign out Admin' })
  @ApiResponse({
    status: 200,
    description: 'Sign out',
    type: Object,
  })
  @HttpCode(200)
  @Post('signout-admin')
  async signOut(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutAdmin(refresh_token, res);
  }

  @ApiOperation({ summary: 'Refresh Admin' })
  @ApiResponse({
    status: 200,
    description: 'Refresh',
    type: Object,
  })
  @HttpCode(200)
  @Post('refresh-admin')
  async refreshAdminToken(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshAdminToken(refresh_token, res);
  }

  // ------------------- User Controller ---------------------
  @ApiOperation({ summary: 'Register new User' })
  @ApiResponse({
    status: 201,
    description: 'Registered',
    type: Object,
  })
  @Post('signup-user')
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUser(createUserDto);
  }

  @ApiOperation({ summary: 'Verify OTP' })
  @ApiResponse({
    status: 200,
    description: 'Verify OTP',
    type: Object,
  })
  @HttpCode(200)
  @Post('verify-otp')
  async verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.verifyOtp(verifyOtpDto, res);
  }

  @ApiOperation({ summary: 'Send again OTP' })
  @ApiResponse({
    status: 200,
    description: 'Send again OTP',
    type: Object,
  })
  @HttpCode(200)
  @Post('send-again-otp')
  async sendAgainOtp(@Body() sendOtpAgainDto: SendOtpAgainDto) {
    return this.authService.sendOtpAgain(sendOtpAgainDto);
  }

  @ApiOperation({ summary: 'Sign in User' })
  @ApiResponse({
    status: 200,
    description: 'Sign in',
    type: Object,
  })
  @HttpCode(200)
  @Post('signin-user')
  async signInUser(
    @Body() signInUserDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInUser(signInUserDto, res);
  }

  @ApiOperation({ summary: 'Sign out User' })
  @ApiResponse({
    status: 200,
    description: 'Sign out',
    type: Object,
  })
  @HttpCode(200)
  @Post('signout-user')
  async signOutUser(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutUser(refresh_token, res);
  }

  @ApiOperation({ summary: 'Refresh User' })
  @ApiResponse({
    status: 200,
    description: 'Refresh',
    type: Object,
  })
  @HttpCode(200)
  @Post('refresh-user')
  async refreshUserToken(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshUserToken(refresh_token, res);
  }
}
