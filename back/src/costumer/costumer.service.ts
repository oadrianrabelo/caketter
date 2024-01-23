import { Injectable } from '@nestjs/common';
import { DataService } from 'src/PrismaClient/prisma.service';
import { CreateCostumer } from './dto/create-costumer.dto';
import { UpdateCostumer } from './dto/update-costumer.dto';

@Injectable()
export class CostumerService {
  constructor(private dataService: DataService) {}

  async createCostumer(costumer: CreateCostumer) {
    const createCostumer = await this.dataService.costumer.create({
      include: {
        address: true,
      },
      data: {
        name: costumer.name,
        contact: costumer.contact,
        email: costumer.email,
        user_uuid: costumer.user_uuid,
        address: {
          create: {
            avenue: costumer.address.avenue,
            neighborhood: costumer.address.neighborhood,
            number: costumer.address.number,
            costumer_id: costumer.address.costumer_id,
          },
        },
        address_id: costumer.address_id,
      },
    });

    return createCostumer;
  }

  async getCostumer() {
    return await this.dataService.costumer.findMany({
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async getCostumersByUserUuid(userUuid: string) {
    return await this.dataService.costumer.findMany({
      where: {
        user_uuid: userUuid,
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        address: true,
      },
    });
  }

  async getCostumerByLike(termo: string) {
    return this.dataService.costumer.findMany({
      where: {
        name: {
          contains: termo,
        },
      },
    });
  }

  async getCostumerById(id: number) {
    return await this.dataService.costumer.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        contact: true,
        email: true,
        address: true,
      },
    });
  }

  async updateCostumer(id: number, costumer: UpdateCostumer) {
    return this.dataService.costumer.update({
      where: {
        id: id,
      },
      data: {
        name: costumer.name,
        contact: costumer.contact,
        email: costumer.email,
        // address: costumer.address,
        user_uuid: costumer.user_uuid,
      },
      select: {
        name: true,
        contact: true,
        email: true,
        user_uuid: true,
      },
    });
  }

  async deleteCostumer(id: number) {
    return this.dataService.costumer.delete({
      where: {
        id: id,
      },
      select: {
        name: true,
        contact: true,
      },
    });
  }
}
