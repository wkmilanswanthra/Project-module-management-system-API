import { Module } from '@nestjs/common';
import { MarksheetsService } from './marksheets.service';
import { MarksheetsController } from './marksheets.controller';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { Mark } from 'src/marks/entities/mark.entity';
import { Submission } from 'src/submission/entities/submission.entity';
import { Marksheet } from './entities/marksheet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Assessment,
      User,
      Project,
      Mark,
      Submission,
      Marksheet,
    ]),
  ],
  controllers: [MarksheetsController],
  providers: [MarksheetsService],
})
export class MarksheetsModule {}
