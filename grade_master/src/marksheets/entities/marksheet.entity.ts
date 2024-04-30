import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Mark } from 'src/marks/entities/mark.entity';
import { User } from 'src/auth/entities/user.entity';
import { Assessment } from 'src/assessment/entities/assessment.entity';
import { Project } from 'src/project/entities/project.entity';

@Entity()
@Unique(['studentId'])
export class Marksheet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  student: User;

  @Column({ type: 'varchar', length: 30 })
  studentId: string;

  @ManyToOne(() => Project)
  project: Project;

  @Column()
  projectId: number;

  @Column({ type: 'json' })
  marksheet: any;
}
