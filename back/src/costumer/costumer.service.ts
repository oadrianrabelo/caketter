import { Injectable } from '@nestjs/common';
import { DataService } from 'src/PrismaClient/prisma.service';
import { CreateCostumer } from './dto/create-costumer.dto';
import { UpdateCostumer } from './dto/update-costumer.dto';

@Injectable()
export class CostumerService {
  constructor(private dataService: DataService) {}

  async createCostumer(costumer: CreateCostumer) {
    const createCostumer = await this.dataService.costumers.create({
      data: {
        ...costumer,
      },
    });
    return createCostumer;
  }

  async getCostumer() {
    return await this.dataService.costumers.findMany();
  }

  async getCostumerById(id: number) {
    return await this.dataService.costumers.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        contact: true,
      },
    });
  }

  async updateCostumer(id: number, costumer: UpdateCostumer) {
    return this.dataService.costumers.update({
      where: {
        id: id,
      },
      data: {
        ...costumer,
      },
      select: {
        name: true,
        contact: true,
      },
    });
  }

  async deleteCostumer(id: number) {
    return this.dataService.costumers.delete({
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
