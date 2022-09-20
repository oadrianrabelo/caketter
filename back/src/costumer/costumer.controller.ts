import { Body, Controller, Post } from '@nestjs/common';
import { Get, Put } from '@nestjs/common/decorators';
import { CostumerService } from './costumer.service';
import { CreateCostumer } from './dto/create-costumer.dto';

@Controller('costumers')
export class CostumerController {
  constructor(private costumerService: CostumerService) {}

  @Post()
  createCostumer(@Body() dto: CreateCostumer) {
    return this.costumerService.createCostumer(dto);
  }

  @Get()
  getCostumer() {
    return this.costumerService.getCostumer();
  }
}
