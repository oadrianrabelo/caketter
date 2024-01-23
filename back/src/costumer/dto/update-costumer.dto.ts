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
  address: string;

  @IsUUID()
  @IsOptional()
  user_uuid: string;
}
