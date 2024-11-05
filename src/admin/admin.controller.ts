import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminSelfGuard } from '../common/guards/admin-self.guard';
import { AdminCreatorGuard } from '../common/guards/admin-creator.guard';
import { AdminSelfForUpdateGuard } from '../common/guards/admin-self-for-update.guard';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Add new admin' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: Admin,
  })
  @UseGuards(AdminCreatorGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All admin value',
    type: [Admin],
  })
  @UseGuards(AdminCreatorGuard)
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: Admin,
  })
  @UseGuards(AdminSelfGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: Admin,
  })
  @UseGuards(AdminSelfForUpdateGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Number,
  })
  @UseGuards(AdminCreatorGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
