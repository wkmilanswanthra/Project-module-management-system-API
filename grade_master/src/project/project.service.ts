import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { relative } from 'path';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(projectData: Partial<Project>): Promise<Project[]> {
    const project = this.projectRepository.create(projectData);
    const { member1Id, member2Id, member3Id, member4Id } = projectData;
    const existingProject = await this.projectRepository
      .createQueryBuilder('project')
      .where('project.member1Id = :member1Id', { member1Id })
      .orWhere('project.member2Id = :member2Id', { member2Id })
      .orWhere('project.member3Id = :member3Id', { member3Id })
      .orWhere('project.member4Id = :member4Id', { member4Id })
      .getOne();

    if (existingProject) {
      throw new Error(
        'One or more members are already part of another project',
      );
    }
    const { id } = await this.projectRepository.save(project);
    console.log(id);
    const newProject = await this.projectRepository.find({
      where: { id },
      relations: [
        'supervisor',
        'coSupervisor',
        'member1',
        'member2',
        'member3',
        'member4',
      ],
    });
    console.log(newProject);
    if (!newProject) throw new Error('Project not created');
    return newProject;
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
