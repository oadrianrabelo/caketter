import { IsOptional, IsString } from 'class-validator';

export class UpdateCostumer {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  contact: string;
}
