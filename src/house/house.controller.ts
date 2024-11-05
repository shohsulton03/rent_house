import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { HouseService } from './house.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { UpdateHouseDto } from './dto/update-house.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { House } from './models/house.model';
import { AddRemoveFurnitureDto } from './dto/addRemoveFurniture.dto';
import { UserGuard } from '../common/guards/user.guard';

@ApiTags('House')
@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @ApiOperation({ summary: 'Add new House' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: House,
  })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createHouseDto: CreateHouseDto) {
    return this.houseService.create(createHouseDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All House value',
    type: [House],
  })
  @Get()
  findAll() {
    return this.houseService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: House,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: House,
  })
  @UseGuards(UserGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHouseDto: UpdateHouseDto) {
    return this.houseService.update(+id, updateHouseDto);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Number,
  })
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseService.remove(+id);
  }

  @ApiOperation({ summary: 'Add furniture to house' })
  @ApiResponse({
    status: 200,
    description: 'add furniture house',
    type: Object,
  })
  @HttpCode(HttpStatus.OK)
  @Post('add-furniture')
  async addFurniture(@Body() addRemoveFurnitureDto: AddRemoveFurnitureDto) {
    return this.houseService.addFurniture(addRemoveFurnitureDto);
  }

  @ApiOperation({ summary: 'Remove furniture to house' })
  @ApiResponse({
    status: 200,
    description: 'remove furniture house',
    type: Object,
  })
  @HttpCode(HttpStatus.OK)
  @Post('remove-furniture')
  async removeFurniture(@Body() addRemoveFurnitureDto: AddRemoveFurnitureDto) {
    return this.houseService.removeFurniture(addRemoveFurnitureDto);
  }
}
