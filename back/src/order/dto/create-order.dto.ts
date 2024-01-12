import { IsDate, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrder {
  @IsNumber()
  @IsNotEmpty()
  id_costumer: number;

  @IsNumber()
  @IsNotEmpty()
  id_cake: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  delivery_date: Date;

  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;
}
