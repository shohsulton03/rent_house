import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from '../common/guards/user.guard';
import { UserSelfGuard } from '../common/guards/user-self.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './models/user.model';
import { UserSelfForUpdateGuard } from '../common/guards/user-self-for-update.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Add new user' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All user value',
    type: [User],
  })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get('owner/:id')
  findOwner(@Param('id') id: string) {
    return this.userService.findOwnerHouses(+id);
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: User,
  })
  @UseGuards(UserSelfGuard)
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: User,
  })
  @UseGuards(UserSelfForUpdateGuard)
  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Number,
  })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
