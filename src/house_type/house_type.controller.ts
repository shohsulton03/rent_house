import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HouseTypeService } from './house_type.service';
import { CreateHouseTypeDto } from './dto/create-house_type.dto';
import { UpdateHouseTypeDto } from './dto/update-house_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HouseType } from './models/house_type.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('House-Type')
@Controller('house-type')
export class HouseTypeController {
  constructor(private readonly houseTypeService: HouseTypeService) {}

  @ApiOperation({ summary: 'Add new House type' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: HouseType,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createHouseTypeDto: CreateHouseTypeDto) {
    return this.houseTypeService.create(createHouseTypeDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All HouseType value',
    type: [HouseType],
  })
  @Get()
  findAll() {
    return this.houseTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: HouseType,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.houseTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: HouseType,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHouseTypeDto: UpdateHouseTypeDto,
  ) {
    return this.houseTypeService.update(+id, updateHouseTypeDto);
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
    return this.houseTypeService.remove(+id);
  }
}
