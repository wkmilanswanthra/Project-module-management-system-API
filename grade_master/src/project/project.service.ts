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
    try {
      const projects = await this.projectRepository.find({
        relations: [
          'supervisor',
          'coSupervisor',
          'member1',
          'member2',
          'member3',
          'member4',
        ],
      });
      if (!projects) throw new Error('No projects found');
      projects.forEach((proj: any) => {
        delete proj.supervisor.password;
        delete proj.coSupervisor.password;
        delete proj.member1.password;
        delete proj.member2.password;
        delete proj.member3.password;
        delete proj.member4.password;
        delete proj.supervisor.username;
        delete proj.coSupervisor.username;
        delete proj.member1.username;
        delete proj.member2.username;
        delete proj.member3.username;
        delete proj.member4.username;
      });
      return projects;
    } catch (error) {
      throw new Error(error.message);
    }
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
