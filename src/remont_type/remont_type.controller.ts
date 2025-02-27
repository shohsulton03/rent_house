import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RemontTypeService } from './remont_type.service';
import { CreateRemontTypeDto } from './dto/create-remont_type.dto';
import { UpdateRemontTypeDto } from './dto/update-remont_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RemontType } from './models/remont_type.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Remont Type')
@Controller('remont-type')
export class RemontTypeController {
  constructor(private readonly remontTypeService: RemontTypeService) {}

  @ApiOperation({ summary: 'Add new remont type' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: RemontType,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createRemontTypeDto: CreateRemontTypeDto) {
    return this.remontTypeService.create(createRemontTypeDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All remont type value',
    type: [RemontType],
  })
  @Get()
  findAll() {
    return this.remontTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: RemontType,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.remontTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: RemontType,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRemontTypeDto: UpdateRemontTypeDto,
  ) {
    return this.remontTypeService.update(+id, updateRemontTypeDto);
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
    return this.remontTypeService.remove(+id);
  }
}
