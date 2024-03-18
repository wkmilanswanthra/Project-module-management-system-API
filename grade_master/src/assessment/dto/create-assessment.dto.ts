import { IsNotEmpty } from 'class-validator';

export class CreateAssessmentDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly semesterId: number;

  @IsNotEmpty()
  readonly assessmentType: string;
}
