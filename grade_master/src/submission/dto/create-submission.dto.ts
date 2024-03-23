import { IsNotEmpty, IsNumber } from 'class-validator';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { Timestamp } from 'typeorm';

export class CreateSubmissionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly assessmentId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly projectId: number;

  @IsNotEmpty()
  filepath: string;

  @IsNotEmpty()
  dateSubmitted: Timestamp;
}
