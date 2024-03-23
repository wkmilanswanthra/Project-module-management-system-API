import { IsNotEmpty } from 'class-validator';
import { Timestamp } from 'typeorm';

export class CreateAssessmentDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly semesterId: number;

  @IsNotEmpty()
  readonly assessmentType: string;

  @IsNotEmpty()
  readonly dueDate: Timestamp;
}
