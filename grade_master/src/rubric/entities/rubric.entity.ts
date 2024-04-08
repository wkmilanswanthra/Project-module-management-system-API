import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Assessment } from 'src/assessment/entities/assessment.entity';

@Entity()
export class Rubric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  criteria: any;

  @OneToOne(() => Assessment)
  @JoinColumn({ name: 'assessmentId' })
  assessment: Assessment;

  @Column()
  assessmentId: number;
}
