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
  readonly supervisor: User;

  readonly coSupervisor?: User;

  readonly member1?: User;

  readonly member2?: User;

  readonly member3?: User;

  readonly member4?: User;
}
