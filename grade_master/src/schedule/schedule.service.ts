import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    try {
      return await this.scheduleRepository.save(createScheduleDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Schedule[]> {
    try {
      return await this.scheduleRepository.find();
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
      await this.scheduleRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
