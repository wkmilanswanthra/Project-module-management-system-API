import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mark } from './entities/mark.entity';
import { CreateMarkDto } from './dto/create-mark.dto';

@Injectable()
export class MarksService {
  constructor(
    @InjectRepository(Mark)
    private readonly markRepository: Repository<Mark>,
  ) {}

  async create(createMarkDto: CreateMarkDto): Promise<Mark> {
    try {
      const mark = this.markRepository.create(createMarkDto);
      await this.markRepository.save(mark);
      return mark;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Mark[]> {
    try {
      return this.markRepository.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Mark> {
    try {
      return this.markRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findBySubmissionId(submissionId: number): Promise<Mark> {
    try {
      return this.markRepository.findOne({
        where: { submissionId },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateMarkDto): Promise<Mark> {
    try {
      const mark = await this.markRepository.update(id, updateMarkDto);
      if (!mark) {
        throw new Error('Mark not found');
      }

      return this.markRepository.findOneBy({ id });
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.markRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
