import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contract } from './models/contract.model';

@ApiTags('Contract')
@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @ApiOperation({ summary: 'Add new Contract' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: Contract,
  })
  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All Contract value',
    type: [Contract],
  })
  @Get()
  findAll() {
    return this.contractService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: Contract,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: Contract,
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractService.update(+id, updateContractDto);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
