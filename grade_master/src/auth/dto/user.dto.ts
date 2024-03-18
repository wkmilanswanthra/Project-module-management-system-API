import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Role, Specialization } from '../interface/auth.interface';

export class UserDto {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly role: Role;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly contact: string;

  @IsString()
  readonly specialization: Specialization;

  @IsString()
  readonly batch: string;

  @IsString()
  readonly registrationNumber: string;

  @IsString()
  readonly createdAt: Date;

  @IsString()
  readonly updatedAt: Date;
}
