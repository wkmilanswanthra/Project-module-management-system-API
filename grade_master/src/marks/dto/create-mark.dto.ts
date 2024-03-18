import { IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class CreateMarkDto {
  @IsNotEmpty()
  @IsNumber()
  readonly submissionId: number;

  @IsNotEmpty()
  @IsObject()
  readonly marking: any;
}
