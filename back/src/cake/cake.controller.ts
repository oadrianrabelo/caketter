import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put, Query } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { CakeService } from './cake.service';
import { CreateCake } from './dto/create-cake.dto';
import { UpdateCake } from './dto/update-cake.dto';

@Controller()
export class CakeController {
  constructor(private cakeService: CakeService) {}

  @Post('/cake/create')
  createCake(@Body() dto: CreateCake) {
    return this.cakeService.createCake(dto);
  }

  @Get('/cakes')
  getCake() {
    return this.cakeService.getCake();
  }

  @Get('/cakes/user')
  getCakesByUserUuid(@Query('userUuid') userUuid: string) {
    return this.cakeService.getCakesByUserUuid(userUuid);
  }

  @Get('/cake/:id')
  getCakeById(@Param('id', ParseIntPipe) id: number) {
    return this.cakeService.getCakeById(id);
  }

  @Get('/cakes/search')
  getCakeSearch(@Query('q') q: string) {
    return this.cakeService.getCakeSearch(q);
  }

  @Put('cake/edit/:id')
  updateCake(
    @Param('id', ParseIntPipe) id: number,
    @Body() cakeData: UpdateCake,
  ) {
    return this.cakeService.updateCake(id, cakeData);
  }

  @Delete('cake/delete/:id')
  deleteCake(@Param('id', ParseIntPipe) id: number) {
    return this.cakeService.deleteCake(id);
  }
}
