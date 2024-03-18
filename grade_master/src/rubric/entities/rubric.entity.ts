import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Assessment } from 'src/assessment/entities/assessment.entity';

@Entity()
export class Rubric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  criteria: any;

  @ManyToOne(() => Assessment)
  @JoinColumn({ name: 'assessmentId' })
  assessment: Assessment;
}
