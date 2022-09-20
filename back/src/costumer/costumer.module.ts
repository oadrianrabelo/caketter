import { Module } from '@nestjs/common/decorators';
import { CostumerController } from './costumer.controller';
import { CostumerService } from './costumer.service';

@Module({
  providers: [CostumerService],
  exports: [CostumerService],
  controllers: [CostumerController],
})
export class CostumerModule {}
