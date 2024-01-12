import { Injectable } from '@nestjs/common/decorators';
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
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getOrdersByUserUuid(userUuid: string) {
    return await this.dataService.order.findMany({
      where: {
        user_uuid: userUuid,
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        cake: true,
        costumer: true,
      },
    });
  }

  async getOrderSearch(q: any) {
    return this.dataService.order.findMany({
      select: {
        costumer: true,
        cake: true,
        created_at: true,
        delivery_date: true,
        updated_at: true,
        price: true,
      },
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
    return this.dataService.order.update({
      where: {
        id: id,
      },
      data: {
        ...order,
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
  async deleteOrder(id: number) {
    return this.dataService.order.delete({
      where: {
        id: id,
      },
    });
  }
}
