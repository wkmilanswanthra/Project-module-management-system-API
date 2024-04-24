import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { User } from 'src/auth/entities/user.entity';
import { Project } from 'src/project/entities/project.entity';

@Entity()
@Unique(['projectId', 'assessmentId'])
@Unique(['date', 'startTime', 'location'])
export class Schedule {
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

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'varchar' })
  location: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examiner1Id' })
  examiner1: User;

  @Column()
  examiner1Id: number;

  @Column()
  examiner2Id: number;

  @Column()
  examiner3Id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examiner2Id' })
  examiner2: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examiner3Id' })
  examiner3: User;
}
