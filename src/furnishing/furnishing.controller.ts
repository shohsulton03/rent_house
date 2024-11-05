import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FurnishingService } from './furnishing.service';
import { CreateFurnishingDto } from './dto/create-furnishing.dto';
import { UpdateFurnishingDto } from './dto/update-furnishing.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Furnishing } from './models/furnishing.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Furniture')
@Controller('furniture')
export class FurnishingController {
  constructor(private readonly furnishingService: FurnishingService) {}

  @ApiOperation({ summary: 'Add new Furniture' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: Furnishing,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createFurnishingDto: CreateFurnishingDto) {
    return this.furnishingService.create(createFurnishingDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All Furniture value',
    type: [Furnishing],
  })
  @Get()
  findAll() {
    return this.furnishingService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: Furnishing,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.furnishingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: Furnishing,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFurnishingDto: UpdateFurnishingDto,
  ) {
    return this.furnishingService.update(+id, updateFurnishingDto);
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
    return this.furnishingService.remove(+id);
  }
}
