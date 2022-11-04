import { Injectable } from '@nestjs/common';
import { DataService } from 'src/PrismaClient/prisma.service';
import { CreateCostumer } from './dto/create-costumer.dto';
import { UpdateCostumer } from './dto/update-costumer.dto';

@Injectable()
export class CostumerService {
  constructor(private dataService: DataService) {}

  async createCostumer(costumer: CreateCostumer) {
    const createCostumer = await this.dataService.costumer.create({
      data: {
        ...costumer,
      },
    });
    return createCostumer;
  }

  async getCostumer() {
    return await this.dataService.costumer.findMany();
  }

  async getCostumerByLike(termo: string) {
    // const busca = `%${termo}%`;
    // return await this.dataService
    // .$queryRaw`SELECT * FROM "costumer" WHERE name LIKE ${busca}`;
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
      },
    });
  }

  async updateCostumer(id: number, costumer: UpdateCostumer) {
    return this.dataService.costumer.update({
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
