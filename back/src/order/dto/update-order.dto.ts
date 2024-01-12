import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrder {
  @IsNumber()
  @IsOptional()
  id_costumer: number;

  @IsNumber()
  @IsOptional()
  id_cake: number;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  delivery_date: Date;

  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;
}
