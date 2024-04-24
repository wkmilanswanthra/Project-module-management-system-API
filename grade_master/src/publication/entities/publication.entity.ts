import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
@Unique(['projectId'])
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  conferenceJournal: string;

  @Column({ nullable: true })
  conferenceJournalName: string;

  @Column({ nullable: true })
  issnNumber: string;

  @Column({ nullable: true })
  rankingLink: string;

  @Column({ nullable: true })
  scopusLink: string;

  @Column({ nullable: true })
  acceptanceLetterPath: string;

  @Column({ nullable: true })
  confirmationPhotoPath: string;

  @Column({ nullable: true })
  registrationFee: number;

  @ManyToOne(() => Project)
  project: Project;

  @Column()
  projectId: number;

  @Column()
  supervisor: number;

  @Column()
  cosupervisor: number;

  @Column('integer', { array: true })
  members: number[];
}
