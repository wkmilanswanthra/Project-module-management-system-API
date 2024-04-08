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

@Entity()
@Unique(['date', 'startTime', 'location'])
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assessment)
  @JoinColumn({ name: 'assessmentId' })
  assessment: Assessment;

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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examiner2Id' })
  examiner2: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'examiner3Id' })
  examiner3: User;
}
