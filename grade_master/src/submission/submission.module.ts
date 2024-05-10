import { Module } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionController } from './submission.controller';
import { Submission } from './entities/submission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubric } from 'src/rubric/entities/rubric.entity';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Submission, Rubric, Schedule])],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class SubmissionModule {}
