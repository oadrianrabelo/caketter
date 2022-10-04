import { Injectable } from '@nestjs/common';
import { DataService } from 'src/PrismaClient/prisma.service';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private dataService: DataService) {}

  async createUser(user: CreateUser) {
    const createUser = await this.dataService.user.create({
      data: {
        ...user,
      },
    });
    return createUser;
  }

  async getUsers() {
    return await this.dataService.user.findMany();
  }

  async getUserById(id: number, uuid?: string) {
    return await this.dataService.user.findUnique({
      where: {
        id: id,
        uuid: uuid,
      },
      select: {
        uuid: true,
        name: true,
        email: true,
        login: true,
        password: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
  async updateUser(id: number, user: UpdateUser) {
    return this.dataService.user.update({
      where: {
        id: id,
      },
      data: {
        ...user,
      },
      select: {
        uuid: true,
        name: true,
        email: true,
        login: true,
        password: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async deleteUser(id: number) {
    return this.dataService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
