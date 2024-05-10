import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from './entities/schedule.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Submission } from 'src/submission/entities/submission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Submission])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
