import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Submission } from 'src/submission/entities/submission.entity';

@Entity()
@Unique(['submissionId'])
export class Mark {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Submission)
  @JoinColumn({ name: 'submissionId' })
  submissionId: number;

  @Column({ type: 'json' })
  marking: any;
}
