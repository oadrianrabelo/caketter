import { Injectable } from '@nestjs/common';
import { DataService } from 'src/PrismaClient/prisma.service';
import { CreateCostumer } from './dto/create-costumer.dto';

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
}
