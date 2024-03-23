import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';
import { Semester } from './semester.entity';

@Entity()
export class Assessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @ManyToOne(() => Semester, (semester) => semester.assessments)
  @JoinColumn({ name: 'semesterId' })
  semester: Semester;

  @Column({ type: 'varchar', length: 20 })
  assessmentType: string;

  @Column({ type: 'timestamp' })
  dueDate: Timestamp;
}
