import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { District } from './models/district.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'Add new District' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: District,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All district value',
    type: [District],
  })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: District,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: District,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtService.update(+id, updateDistrictDto);
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
    return this.districtService.remove(+id);
  }
}
