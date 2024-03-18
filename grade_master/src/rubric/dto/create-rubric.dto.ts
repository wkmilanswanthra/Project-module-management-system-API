import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateRubricDto {
  @IsNotEmpty()
  @IsObject()
  readonly criteria: any;

  @IsNotEmpty()
  readonly assessmentId: number;
}
