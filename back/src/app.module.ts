import { Module } from '@nestjs/common';
import { CakeModule } from './cake/cake.module';
import { CostumerModule } from './costumer/costumer.module';
import { OrderModule } from './order/order.module';
import { DataModule } from './PrismaClient/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DataModule,
    CostumerModule,
    CakeModule,
    OrderModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
