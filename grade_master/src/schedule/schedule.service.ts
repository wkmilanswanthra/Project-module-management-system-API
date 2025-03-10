import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { Submission } from 'src/submission/entities/submission.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,

    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    try {
      const sub = await this.submissionRepository.findOne({
        where: {
          assessmentId: createScheduleDto.assessmentId,
          projectId: createScheduleDto.projectId,
        },
      });
      if (sub) {
        throw new Error('Schedule already exists');
      }

      const dateTimeString = `${createScheduleDto.date}T${createScheduleDto.startTime}:00`;
      const dateSubmitted = new Date(dateTimeString);

      const submission = this.submissionRepository.save({
        assessmentId: createScheduleDto.assessmentId,
        projectId: createScheduleDto.projectId,
        filepath: '',
        dateSubmitted,
      });
      return await this.scheduleRepository.save(createScheduleDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Schedule[]> {
    try {
      return await this.scheduleRepository.find({
        relations: [
          'examiner1',
          'examiner2',
          'examiner3',
          'assessment',
          'project',
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Schedule> {
    try {
      return await this.scheduleRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findScheduleByAssessmentId(assessmentId: any): Promise<Schedule> {
    try {
      const schedule = await this.scheduleRepository.findOne({
        where: { assessmentId: assessmentId },
        relations: ['examiner1', 'examiner2', 'examiner3', 'assessment'],
      });
      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: number,
    updateScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    try {
      await this.scheduleRepository.update(id, updateScheduleDto);
      return await this.scheduleRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const schedule = await this.scheduleRepository.findOneBy({ id });
      if (!schedule) {
        throw new Error('Schedule not found');
      }

      const submissions = await this.submissionRepository.findOne({
        where: {
          assessmentId: schedule.assessmentId,
          projectId: schedule.projectId,
        },
      });
      if (!submissions) {
        throw new Error('Submission not found');
      }
      await this.submissionRepository.delete(submissions.id);
      await this.scheduleRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
