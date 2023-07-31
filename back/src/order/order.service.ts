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

  async getOrderSearch(q: any) {
    return this.dataService.order.findMany({
      where: {
        costumer: {
          name: {
            contains: q,
          },
        },
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
            filling: order.cake.filling,
            size: order.cake.size,
            theme: order.cake.theme,
            age_top: order.cake.age_top,
            name_top: order.cake.name_top,
          },
        },
        costumer: {
          connect: {
            id: order.id_costumer,
          },
          update: {
            name: order.costumer.name,
            contact: order.costumer.contact,
          },
        },
      },
    });
  }
  async deleteOrder(id: number) {
    return this.dataService.order.delete({
      where: {
        id: id,
      },
    });
  }
}
