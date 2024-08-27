import { Body, Controller, Post } from '@nestjs/common';
import { Delete, Get, Param, Query, Put, Req } from '@nestjs/common/decorators';
import { ParseIntPipe, ParseUUIDPipe } from '@nestjs/common/pipes';
import { CostumerService } from './costumer.service';
import { CreateCostumer } from './dto/create-costumer.dto';
import { UpdateCostumer } from './dto/update-costumer.dto';

// TODO: RENAME ROUTES TO MATCH CAKE CONTROLLER
@Controller('costumer')
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

  @Get('/user')
  getCostumersByUserUuid(@Query('userUuid') userUuid: string) {
    return this.costumerService.getCostumersByUserUuid(userUuid);
  }

  @Get('search')
  getCostumerByLike(
    @Query('q') q: string,
    @Query('userUuid') userUuid: string,
  ) {
    return this.costumerService.getCostumerByLike(q, userUuid);
  }

  @Get(':id')
  getCostumerById(@Param('id', ParseIntPipe) id: number) {
    return this.costumerService.getCostumerById(id);
  }

  @Put(':id')
  updateCostumer(
    @Param('id', ParseIntPipe) id: number,
    @Body() costumerData: UpdateCostumer,
  ) {
    return this.costumerService.updateCostumer(id, costumerData);
  }

  @Delete(':id')
  deleteCostumer(@Param('id', ParseIntPipe) id: number) {
    return this.costumerService.deleteCostumer(id);
  }
}
