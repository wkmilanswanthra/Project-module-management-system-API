import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { Project } from 'src/project/entities/project.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assessment)
  @JoinColumn({ name: 'assessmentId' })
  assessmentId: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  projectId: number;

  @Column({ nullable: false })
  filepath: string;
}
