import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCostumer {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
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
  @IsOptional()
  user_uuid: string;
}
