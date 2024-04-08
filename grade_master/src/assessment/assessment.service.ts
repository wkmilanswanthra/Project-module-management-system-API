// assessment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assessment } from './entities/assessment.entity';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { Semester } from './entities/semester.entity';

@Injectable()
export class AssessmentService {
  constructor(
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
    @InjectRepository(Semester)
    private readonly semesterRepository: Repository<Semester>,
  ) {}

  async create(createAssessmentDto: CreateAssessmentDto): Promise<Assessment> {
    try {
      return this.assessmentRepository.save(createAssessmentDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Assessment[]> {
    try {
      return this.assessmentRepository.find({
        relations: ['semester'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number): Promise<Assessment> {
    try {
      return this.assessmentRepository.findOne({
        where: { id },
        relations: ['semester'],
      });
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    updateAssessmentDto: CreateAssessmentDto,
  ): Promise<Assessment> {
    try {
      await this.assessmentRepository.update(id, updateAssessmentDto);
      return this.assessmentRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.assessmentRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findAllSemesters(): Promise<Semester[]> {
    try {
      return this.semesterRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOneSemester(id: number): Promise<Semester> {
    try {
      return this.semesterRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async updateSemester(id: number, updateSemesterDto): Promise<Semester> {
    try {
      await this.semesterRepository.update(id, updateSemesterDto);
      return this.semesterRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }
}
