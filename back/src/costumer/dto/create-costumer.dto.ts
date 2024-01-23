import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
export class CreateCostumer {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  street: string;

  @IsString()
  @IsOptional()
  number: string;

  @IsString()
  @IsOptional()
  neighborhood: string;

  @IsUUID()
  @IsNotEmpty()
  user_uuid: string;
}
