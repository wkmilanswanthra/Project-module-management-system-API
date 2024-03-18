import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectRepository.create(projectData);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async findOne(id: number): Promise<Project> {
    return this.projectRepository.findOneBy({ id });
  }

  async update(id: number, projectData: Partial<Project>): Promise<Project> {
    await this.projectRepository.update(id, projectData);
    return this.projectRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
