import { Module } from '@nestjs/common';
import { CakeController } from './cake.controller';
import { CakeService } from './cake.service';

@Module({
  providers: [CakeService],
  exports: [CakeService],
  controllers: [CakeController],
})
export class CakeModule {}
