// rubric.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rubric } from './entities/rubric.entity';
import { CreateRubricDto } from './dto/create-rubric.dto';

@Injectable()
export class RubricService {
  constructor(
    @InjectRepository(Rubric)
    private readonly rubricRepository: Repository<Rubric>,
  ) {}

  async create(createRubricDto: CreateRubricDto): Promise<Rubric> {
    try {
      const rubric = this.rubricRepository.create(createRubricDto);
      return this.rubricRepository.save(rubric);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Rubric[]> {
    try {
      return this.rubricRepository.find({
        relations: ['assessment'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number): Promise<Rubric> {
    try {
      return this.rubricRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
    }
  }

  async findOneByAssessmentId(assessmentId: any): Promise<Rubric> {
    try {
      const rubric = await this.rubricRepository.findOne({
        where: { assessmentId: assessmentId },
      });
      if (!rubric) {
        throw new Error('Rubric not found');
      }

      return rubric;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateRubricDto: CreateRubricDto): Promise<Rubric> {
    try {
      const rubric = await this.rubricRepository.preload({
        id: id,
        ...updateRubricDto,
      });
      return this.rubricRepository.save(rubric);
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.rubricRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
