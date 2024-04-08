import {
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
  IsObject,
} from 'class-validator';
import { Batch, Role, Specialization } from '../interface/auth.interface';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  name: string;

  @IsEmail(null, { message: 'Please provide a valid Email.' })
  email: string;

  @IsString()
  @MinLength(3, { message: 'Username must have atleast 3 characters.' })
  username: string;

  @IsString()
  @MinLength(8, { message: 'Password must have atleast 8 characters.' })
  password: string;

  @IsEnum(Specialization)
  @IsOptional()
  specialization?: Specialization;

  @IsEnum(Batch)
  @IsOptional()
  batch?: Batch;

  @IsEnum(Role)
  @IsOptional()
  role?: Role[];

  @IsOptional()
  position?: string;

  @IsString()
  @MinLength(10, { message: 'Contact must have atleast 10 characters.' })
  contact: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsObject()
  @IsOptional()
  al?: any;

  @IsObject()
  @IsOptional()
  guardian?: any;

  @IsString()
  @IsOptional()
  registrationNumber?: string;
}
