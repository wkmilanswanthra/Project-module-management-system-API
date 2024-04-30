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
  UseGuards,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { Response } from 'express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { JwtAuthGuard } from 'src/auth/helpers/jwt.guard';

@Controller('semesters')
export class SemesterController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
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

  @Get(':id')
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

  @Roles('PROJECT_COORDINATOR', 'MEMBER')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
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
