import { User } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCostumer {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;
}
