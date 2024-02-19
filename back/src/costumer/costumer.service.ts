import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { DataService } from 'src/PrismaClient/prisma.service';
import { CreateCostumer } from './dto/create-costumer.dto';
import { UpdateCostumer } from './dto/update-costumer.dto';

@Injectable()
export class CostumerService {
  constructor(private dataService: DataService) {}

  private readonly logger = new Logger(CostumerService.name);

  async createCostumer(costumer: CreateCostumer) {
    this.logger.log(`Criando cliente...`);

    try {
      const createCostumer = await this.dataService.costumer.create({
        data: {
          name: costumer.name,
          contact: costumer.contact,
          email: costumer.email,
          street: costumer.street,
          neighborhood: costumer.neighborhood,
          number: costumer.number,
          user_uuid: costumer.user_uuid,
        },
      });

      this.logger.log(`Cliente ${createCostumer.name} criado com sucesso`);

      return createCostumer;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        this.logger.error(`Falha ao criar cliente: ${error}`);
        throw error;
      }
    }
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
        street: true,
        neighborhood: true,
        number: true,
      },
    });
  }

  async updateCostumer(id: number, costumer: UpdateCostumer) {
    this.logger.log(
      `Atualizando dados do cliente ${costumer.name} com ID ${id}`,
    );
    try {
      const updateCostumer = await this.dataService.costumer.update({
        where: {
          id: id,
        },
        data: {
          name: costumer.name,
          contact: costumer.contact,
          email: costumer.email,
          street: costumer.street,
          neighborhood: costumer.neighborhood,
          number: costumer.number,
        },
        select: {
          id: true,
          name: true,
          contact: true,
          email: true,
          street: true,
          neighborhood: true,
          number: true,
          user_uuid: true,
        },
      });
      this.logger.log(
        `Cliente com ID ${updateCostumer.id} atualizado com sucesso`,
      );
      return updateCostumer;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        this.logger.error(`Erro ao atulizar cliente com ID ${id}`);
        throw error;
      }
    }
  }

  async deleteCostumer(id: number) {
    this.logger.log(`Apagando cliente ${id}`);
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
