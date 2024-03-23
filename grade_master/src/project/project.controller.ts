import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/helpers/jwt.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Response } from 'express';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Roles('PROJECT_COORDINATOR', 'SUPERVISOR', 'CO_SUPERVISOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Res() res: Response,
  ) {
    try {
      const createdProject = await this.projectService.create(createProjectDto);
      return res.status(HttpStatus.CREATED).json(createdProject);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Roles('PROJECT_COORDINATOR', 'SUPERVISOR', 'CO_SUPERVISOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const projects = await this.projectService.findAll();
      return res.status(HttpStatus.OK).json(projects);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Roles('PROJECT_COORDINATOR', 'SUPERVISOR', 'CO_SUPERVISOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const project = await this.projectService.findOne(+id);
      if (!project) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Project not found' });
      }
      return res.status(HttpStatus.OK).json(project);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Roles('PROJECT_COORDINATOR', 'SUPERVISOR', 'CO_SUPERVISOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Res() res: Response,
  ) {
    try {
      const updatedProject = await this.projectService.update(
        +id,
        updateProjectDto,
      );
      if (!updatedProject) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Project not found' });
      }
      return res.status(HttpStatus.OK).json(updatedProject);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Roles('PROJECT_COORDINATOR', 'SUPERVISOR', 'CO_SUPERVISOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.projectService.remove(+id);

      return res
        .status(HttpStatus.OK)
        .json({ message: 'Project deleted successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
