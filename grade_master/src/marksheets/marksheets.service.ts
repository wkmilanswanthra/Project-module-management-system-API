import { Injectable } from '@nestjs/common';
import { CreateMarksheetDto } from './dto/create-marksheet.dto';
import { UpdateMarksheetDto } from './dto/update-marksheet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { Mark } from 'src/marks/entities/mark.entity';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { Submission } from 'src/submission/entities/submission.entity';
import { Role } from 'src/auth/interface/auth.interface';
import { Marksheet } from './entities/marksheet.entity';

@Injectable()
export class MarksheetsService {
  constructor(
    @InjectRepository(Marksheet)
    private readonly marksheetRepository: Repository<Marksheet>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Mark) private readonly markRepository: Repository<Mark>,
    @InjectRepository(Assessment)
    private readonly assessmentRepository: Repository<Assessment>,
    @InjectRepository(Submission)
    private readonly submissionRepository: Repository<Submission>,
  ) {}

  create(createMarksheetDto: CreateMarksheetDto) {
    return 'This action adds a new marksheet';
  }

  async generateMarkSheets() {
    const projects = await this.projectRepository.find();
    const assessments = await this.assessmentRepository.find();
    const marks = await this.markRepository.find({
      relations: ['submissionId.assessment', 'submissionId.project'],
    });

    // if (projects.length * assessments.length > marks.length) {
    //   throw new Error('All marks have not been entered yet');
    // }

    const students = await this.userRepository
      .createQueryBuilder('user')
      .where(':role = ANY(user.role)', { role: Role.STUDENT })
      .getMany();

    students?.forEach(async (student) => {
      let marksheet = {};
      let total = 0;
      let totalWeight = 0;
      let percentage = 0;
      let project = {};

      marksheet['student'] = student;
      marksheet['marks'] = [];

      marks?.forEach((mark: any) => {
        const { member1Id, member2Id, member3Id, member4Id } =
          mark.submissionId.project;

        if (
          student.id === member1Id ||
          student.id === member2Id ||
          student.id === member3Id ||
          student.id === member4Id
        ) {
          project = mark.submissionId.project;
          mark.marking.forEach((marking: any) => {
            marksheet['marks'].push({
              assessment: mark.submissionId.assessment,
              mark: marking.marks.filter((m) => m.studentId === student.id)[0]
                .marks,
            });
            total += marking.marks.filter((m) => m.studentId === student.id)[0]
              .marks[0];
          });
        }
      });

      marksheet['project'] = project;
      marksheet['total'] = total;
      console.log(marksheet);

      const ms = await this.marksheetRepository.find({
        where: { studentId: student.id.toString() },
      });
      try {
        if (ms.length > 0) {
          await this.marksheetRepository.update(
            { studentId: student.id.toString() },
            { marksheet: marksheet },
          );
        } else {
          await this.marksheetRepository.save({
            studentId: student.id.toString(),
            marksheet: marksheet,
            projectId: marksheet['project'].id,
          });
        }
      } catch (e) {
        console.log(e);
      }
    });

    return 'Marksheets generated';
  }

  async findAll() {
    const marksheets = await this.marksheetRepository.find();
    if (!marksheets) {
      throw new Error('No marksheets found');
    }
    return marksheets;
  }

  async findOne(id: number) {
    const marksheet = await this.marksheetRepository.findOneBy({ id });
    console.log(marksheet);
    if (!marksheet) {
      throw new Error('Marksheet not found');
    }
    return marksheet;
  }

  update(id: number, updateMarksheetDto: UpdateMarksheetDto) {
    return `This action updates a #${id} marksheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} marksheet`;
  }
}
