import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUser {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  login: string;

  @IsString()
  @IsOptional()
  password: string;
}
