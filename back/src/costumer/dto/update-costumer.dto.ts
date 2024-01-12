import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCostumer {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  contact: string;

  @IsUUID()
  @IsOptional()
  user_uuid: string;
}
