import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { Project } from 'src/project/entities/project.entity';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assessment)
  @JoinColumn({ name: 'assessmentId' })
  assessment: Assessment;

  @Column()
  assessmentId: number;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  projectId: number;

  @Column({ nullable: false })
  filepath: string;

  @Column({ type: 'timestamp' })
  dateSubmitted: Timestamp;
}
