import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({ summary: 'Create a balanced double-entry transaction' })
  @ApiBody({ type: CreateTransactionDto })
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @ApiOperation({ summary: 'List recent transactions with postings' })
  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }
}
