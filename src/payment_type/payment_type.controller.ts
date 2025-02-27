import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentTypeService } from './payment_type.service';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentType } from './models/payment_type.model';
import { AdminGuard } from '../common/guards/admin.guard';

@Controller('payment-type')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @ApiOperation({ summary: 'Add new payment type' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: PaymentType,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeService.create(createPaymentTypeDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All payment type value',
    type: [PaymentType],
  })
  @Get()
  findAll() {
    return this.paymentTypeService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: PaymentType,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: PaymentType,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentTypeDto: UpdatePaymentTypeDto,
  ) {
    return this.paymentTypeService.update(+id, updatePaymentTypeDto);
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
    return this.paymentTypeService.remove(+id);
  }
}
