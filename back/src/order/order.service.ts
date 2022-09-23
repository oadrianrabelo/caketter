import { Injectable } from '@nestjs/common/decorators';
import { UpdateCake } from 'src/cake/dto/update-cake.dto';
import { UpdateCostumer } from 'src/costumer/dto/update-costumer.dto';
import { DataService } from 'src/PrismaClient/prisma.service';
import { CreateOrder } from './dto/create-order.dto';
import { UpdateOrder } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private dataService: DataService) {}

  async createOrder(order: CreateOrder) {
    const createOrder = await this.dataService.order.create({
      data: {
        ...order,
      },
    });
    return createOrder;
  }

  async getOrders() {
    return await this.dataService.order.findMany({
      include: {
        cake: true,
        costumer: true,
      },
    });
  }

  async getOrderById(id: number) {
    return await this.dataService.order.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        cake: true,
        costumer: true,
        delivery_date: true,
        price: true,
      },
    });
  }
  async updateOrder(id: number, order: UpdateOrder) {
    console.log(order);
    return this.dataService.order.update({
      where: {
        id: id,
      },
      data: {
        cake: {
          connect: {
            id: order.id_cake,
          },
          update: {
            dough: order.cake.dough,
          },
        },
      },
    });
  }
}
/*
async updateOrder(
    order: UpdateOrder,
    cake: UpdateCake,
    costumer: UpdateCostumer,
  ) {
    const updateCake = await this.dataService.cake.update({
      where: {
        id: order.id_cake,
      },
      data: {
        dough: cake.dough,
        filling: cake.filling,
        size: cake.size,
        theme: cake.theme,
      },
    });
    const updateCostumer = await this.dataService.costumer.update({
      where: {
        id: order.id_costumer,
      },
      data: {
        name: costumer.name,
        contact: costumer.contact,
      },
    });
    const updateOrder = await this.dataService.order.update({
      where: {
        id: order.id,
      },
      data: {
        delivery_date: order.delivery_date,
        price: order.price,
      },
    });
    return [updateCake, updateCostumer, updateOrder];
  }
*/
