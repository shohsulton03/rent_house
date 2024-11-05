import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeOfBuildingService } from './type_of_building.service';
import { CreateTypeOfBuildingDto } from './dto/create-type_of_building.dto';
import { UpdateTypeOfBuildingDto } from './dto/update-type_of_building.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TypeOfBuilding } from './models/type_of_building.entity';

@ApiTags('Type Of Building')
@Controller('type-of-building')
export class TypeOfBuildingController {
  constructor(private readonly typeOfBuildingService: TypeOfBuildingService) {}

  @ApiOperation({ summary: 'Add new type building' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: TypeOfBuilding,
  })
  @Post()
  create(@Body() createTypeOfBuildingDto: CreateTypeOfBuildingDto) {
    return this.typeOfBuildingService.create(createTypeOfBuildingDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All type value',
    type: [TypeOfBuilding],
  })
  @Get()
  findAll() {
    return this.typeOfBuildingService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: TypeOfBuilding,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeOfBuildingService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: TypeOfBuilding,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeOfBuildingDto: UpdateTypeOfBuildingDto,
  ) {
    return this.typeOfBuildingService.update(+id, updateTypeOfBuildingDto);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeOfBuildingService.remove(+id);
  }
}
