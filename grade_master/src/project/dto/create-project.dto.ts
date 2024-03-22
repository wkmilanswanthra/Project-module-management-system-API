import { IsNotEmpty } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';

export class CreateProjectDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly researchArea: string;

  @IsNotEmpty()
  readonly researchGroup: string;

  @IsNotEmpty()
  readonly supervisor: number;

  readonly coSupervisor?: number;

  readonly member1?: number;

  readonly member2?: number;

  readonly member3?: number;

  readonly member4?: number;
}
