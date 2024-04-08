// submission.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Project } from 'src/project/entities/project.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Rubric } from 'src/rubric/entities/rubric.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,

    @InjectRepository(Rubric)
    private readonly rubricRepository: Repository<Rubric>,
  ) {}

  async create(
    createSubmissionDto: CreateSubmissionDto,
    file,
  ): Promise<Submission> {
    try {
      const { assessmentId, projectId } = createSubmissionDto;

      const filepath = this.storeFile(file);

      const submission = new Submission();
      submission.assessmentId = assessmentId;
      submission.projectId = projectId;
      submission.filepath = filepath;

      return this.submissionRepository.save(submission);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<Submission[]> {
    try {
      return this.submissionRepository.find({
        relations: ['assessmentId', 'projectId'],
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number): Promise<Submission> {
    try {
      const submission = await this.submissionRepository.findOne({
        where: { id },
        relations: [
          'assessmentId',
          'projectId',
          'projectId.member1',
          'projectId.member2',
          'projectId.member3',
          'projectId.member4',
        ],
      });

      if (!submission) {
        throw new Error('Submission not found');
      }

      return submission;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.submissionRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  private storeFile(file): string {
    const timestamp = new Date().getTime();
    const originalName = file.originalname;
    const uniqueFileName = `${timestamp}_${originalName}`;

    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFileName);
    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }
}
