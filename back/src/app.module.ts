import { Module } from '@nestjs/common';
import { CakeModule } from './cake/cake.module';
import { CostumerModule } from './costumer/costumer.module';
import { OrderModule } from './order/order.module';
import { DataModule } from './PrismaClient/prisma.module';

@Module({
  imports: [DataModule, CostumerModule, CakeModule, OrderModule],
})
export class AppModule {}
