import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCake {
  @IsString()
  @IsNotEmpty()
  dough: string;

  @IsString()
  @IsNotEmpty()
  filling: string;

  @IsNumber()
  @IsNotEmpty()
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

  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;
}
