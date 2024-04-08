import { IsNotEmpty, IsDate, IsString, IsNumber } from 'class-validator';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { User } from 'src/auth/entities/user.entity';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  readonly assessmentId: number;

  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsString()
  readonly startTime: string;

  @IsNotEmpty()
  @IsString()
  readonly endTime: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsString()
  readonly time: string;

  @IsNotEmpty()
  @IsNumber()
  readonly examiner1Id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly examiner2Id: number;

  @IsNotEmpty()
  @IsNumber()
  readonly examiner3Id: number;
}
