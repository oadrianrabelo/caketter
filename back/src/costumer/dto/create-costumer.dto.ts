import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCostumer {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contact: string;
}
