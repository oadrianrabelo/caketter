import { Address } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCostumer {
  [x: string]: number;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsObject()
  @IsOptional()
  address: Address;

  @IsNumber()
  @IsOptional()
  address_id: number;

  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;
}
