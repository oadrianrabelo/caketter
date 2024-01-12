import { Injectable } from '@nestjs/common';
import { DataService } from 'src/PrismaClient/prisma.service';
import { CreateCake } from './dto/create-cake.dto';
import { UpdateCake } from './dto/update-cake.dto';

@Injectable()
export class CakeService {
  constructor(private dataService: DataService) {}

  async createCake(cake: CreateCake) {
    const createCake = await this.dataService.cake.create({
      data: {
        ...cake,
      },
    });
    return createCake;
  }

  async getCake() {
    return await this.dataService.cake.findMany();
  }
  async getCakesByUserUuid(userUuid: string) {
    return await this.dataService.cake.findMany({
      where: {
        user_uuid: userUuid,
      },
      orderBy: {
        created_at: 'asc',
      },
    });
  }

  async getCakeSearch(q: any) {
    return this.dataService.cake.findMany({
      where: {
        name_top: {
          contains: q,
        },
      },
    });
  }

  async getCakeById(id: number) {
    return await this.dataService.cake.findUnique({
      where: {
        id: id,
      },
      select: {
        dough: true,
        filling: true,
        size: true,
        theme: true,
        name_top: true,
        age_top: true,
      },
    });
  }
  async updateCake(id: number, cake: UpdateCake) {
    return this.dataService.cake.update({
      where: {
        id: id,
      },
      data: {
        ...cake,
      },
      select: {
        dough: true,
        filling: true,
        size: true,
        theme: true,
        name_top: true,
        age_top: true,
      },
    });
  }

  async deleteCake(id: number) {
    return this.dataService.cake.delete({
      where: {
        id: id,
      },
      select: {
        dough: true,
        filling: true,
      },
    });
  }
}
