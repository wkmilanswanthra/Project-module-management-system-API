import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { Response } from 'express';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  async create(
    @Body() createAssessmentDto: CreateAssessmentDto,
    @Res() res: Response,
  ) {
    try {
      const createdAssessment =
        await this.assessmentService.create(createAssessmentDto);
      return res.status(HttpStatus.CREATED).json(createdAssessment);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const assessments = await this.assessmentService.findAll();
      return res.status(HttpStatus.OK).json(assessments);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const assessment = await this.assessmentService.findOne(+id);
      if (!assessment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Assessment not found' });
      }
      return res.status(HttpStatus.OK).json(assessment);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAssessmentDto: CreateAssessmentDto,
    @Res() res: Response,
  ) {
    try {
      const updatedAssessment = await this.assessmentService.update(
        +id,
        updateAssessmentDto,
      );
      if (!updatedAssessment) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Assessment not found' });
      }
      return res.status(HttpStatus.OK).json(updatedAssessment);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.assessmentService.remove(+id);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Assessment deleted successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Get('semesters')
  async findAllSemesters(@Res() res: Response) {
    try {
      const semesters = await this.assessmentService.findAllSemesters();
      return res.status(HttpStatus.OK).json(semesters);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Get('semesters/:id')
  async findOneSemester(@Param('id') id: string, @Res() res: Response) {
    try {
      const semester = await this.assessmentService.findOneSemester(+id);
      if (!semester) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Semester not found' });
      }
      return res.status(HttpStatus.OK).json(semester);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Patch('semesters/:id')
  async updateSemester(
    @Param('id') id: string,
    @Body() updateSemesterDto,
    @Res() res: Response,
  ) {
    try {
      const updatedSemester = await this.assessmentService.updateSemester(
        +id,
        updateSemesterDto,
      );
      if (!updatedSemester) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Semester not found' });
      }
      return res.status(HttpStatus.OK).json(updatedSemester);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
