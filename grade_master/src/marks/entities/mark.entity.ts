import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Submission } from 'src/submission/entities/submission.entity';

@Entity()
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Submission)
  @JoinColumn({ name: 'submissionId' })
  submissionId: number;

  @Column({ type: 'json' })
  marking: any;
}
