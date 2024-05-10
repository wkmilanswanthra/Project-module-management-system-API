// submission.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { Project } from 'src/project/entities/project.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Rubric } from 'src/rubric/entities/rubric.entity';
import { Role } from 'src/auth/interface/auth.interface';
import { Schedule } from 'src/schedule/entities/schedule.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,

    @InjectRepository(Rubric)
    private readonly rubricRepository: Repository<Rubric>,

    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
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

  async findAll(role: any, id: string): Promise<Submission[]> {
    try {
      console.log('roles', role);
      console.log('id', id);
      const submissions = await this.submissionRepository.find({
        relations: [
          'assessment',
          'project',
          'project.supervisor',
          'project.coSupervisor',
        ],
      });
      if (role == Role.EXAMINER) {
        const schedule = await this.scheduleRepository.find({
          where: [
            { examiner1Id: parseInt(id) },
            { examiner2Id: parseInt(id) },
            { examiner3Id: parseInt(id) },
          ],
        });
        const filteredSubmissions = submissions.filter(
          (submission) =>
            submission.assessment.assessmentType === 'Presentation' &&
            schedule.some((s) => s.assessmentId === submission.assessmentId),
        );
        return filteredSubmissions;
      }
      if (role == Role.SUPERVISOR || role == Role.CO_SUPERVISOR) {
        const filteredSubmissions = submissions.filter(
          (submission) =>
            (submission.assessment.assessmentType === 'Report' &&
              (submission.project.supervisor as any).id === parseInt(id)) ||
            (submission.project.coSupervisor as any).id === parseInt(id),
        );
        return filteredSubmissions;
      }
      return submissions;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllSubmissionsByProjectId(
    projectId: number,
  ): Promise<Submission[]> {
    try {
      return this.submissionRepository.find({
        where: { projectId: projectId },
        relations: ['assessment', 'project'],
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
          'assessment',
          'project',
          'project.member1',
          'project.member2',
          'project.member3',
          'project.member4',
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
