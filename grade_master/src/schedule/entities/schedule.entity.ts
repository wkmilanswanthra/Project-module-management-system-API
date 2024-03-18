import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assessment)
  @JoinColumn({ name: 'assessmentId' })
  assessment: Assessment;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  time: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examiner1Id' })
  examiner1: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examiner2Id' })
  examiner2: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examiner3Id' })
  examiner3: User;
}
