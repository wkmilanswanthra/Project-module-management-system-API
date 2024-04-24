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

  readonly member1Id?: number;

  readonly member2Id?: number;

  readonly member3Id?: number;

  readonly member4Id?: number;
}
