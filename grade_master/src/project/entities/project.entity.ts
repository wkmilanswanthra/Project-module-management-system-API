import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
@Unique(['member1Id'])
@Unique(['member2Id'])
@Unique(['member3Id'])
@Unique(['member4Id'])
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
  @JoinColumn({ name: 'member1Id' })
  member1?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'member2Id' })
  member2?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'member3Id' })
  member3?: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'member4Id' })
  member4?: User;

  @Column({ nullable: true })
  member1Id: number;

  @Column({ nullable: true })
  member2Id?: number;

  @Column({ nullable: true })
  member3Id?: number;

  @Column({ nullable: true })
  member4Id?: number;
}
