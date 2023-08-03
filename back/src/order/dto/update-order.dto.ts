import { IsDate, IsNumber, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Cake, Costumer } from '@prisma/client';

// type CakeInterface = {
//   id: number;
//   dough: string;
//   filling: string;
//   size: number;
//   theme: string;
//   name_top: string | null;
//   age_top: string | null;
//   created_at: Date;
//   updated_at: Date | null;
// };

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

  // @IsObject()
  // cake: Cake;
  // @IsObject()
  // costumer: Costumer;
}
