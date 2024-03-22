import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 30 })
  researchArea: string;

  @Column({ type: 'varchar', length: 30 })
  researchGroup: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'supervisor' })
  supervisor: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'coSupervisor' })
  coSupervisor?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'member1' })
  member1?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'member2' })
  member2?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'member3' })
  member3?: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'member4' })
  member4?: number;
}
