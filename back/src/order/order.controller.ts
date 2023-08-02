import { OrderService } from './order.service';
import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { Delete, Param, Query } from '@nestjs/common/decorators';
import { CreateOrder } from './dto/create-order.dto';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { UpdateOrder } from './dto/update-order.dto';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('/order/create')
  createOrder(@Body() dto: CreateOrder) {
    return this.orderService.createOrder(dto);
  }

  @Get('/orders')
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get('/orders/search')
  getOrdersSearch(@Query('q') q: string) {
    return this.orderService.getOrderSearch(q);
  }

  @Get('/order/:id')
  getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  @Put('/order/edit/:id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderData: UpdateOrder,
  ) {
    return this.orderService.updateOrder(id, orderData);
  }
  @Delete('/order/delete/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
