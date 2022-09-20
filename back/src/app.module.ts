import { Module } from '@nestjs/common';
import { CostumerModule } from './costumer/costumer.module';
import { DataModule } from './PrismaClient/prisma.module';

@Module({
  imports: [DataModule, CostumerModule],
})
export class AppModule {}
