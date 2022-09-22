import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCake {
  @IsString()
  @IsOptional()
  dough: string;

  @IsString()
  @IsOptional()
  filling: string;

  @IsNumber()
  @IsOptional()
  size: number;

  @IsString()
  @IsOptional()
  theme: string;

  @IsString()
  @IsOptional()
  name_top: string;

  @IsString()
  @IsOptional()
  age_top: string;
}
