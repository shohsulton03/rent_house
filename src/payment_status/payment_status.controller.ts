import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { CreatePaymentStatusDto } from './dto/create-payment_status.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment_status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentStatus } from './models/payment_status.model';
import { AdminGuard } from '../common/guards/admin.guard';

@ApiTags('Payment-Status')
@Controller('payment-status')
export class PaymentStatusController {
  constructor(private readonly paymentStatusService: PaymentStatusService) {}

  @ApiOperation({ summary: 'Add new payment status' })
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: PaymentStatus,
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPaymentStatusDto: CreatePaymentStatusDto) {
    return this.paymentStatusService.create(createPaymentStatusDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  @ApiResponse({
    status: 200,
    description: 'All payment status value',
    type: [PaymentStatus],
  })
  @Get()
  findAll() {
    return this.paymentStatusService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: PaymentStatus,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentStatusService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: PaymentStatus,
  })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
  ) {
    return this.paymentStatusService.update(+id, updatePaymentStatusDto);
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
    return this.paymentStatusService.remove(+id);
  }
}
