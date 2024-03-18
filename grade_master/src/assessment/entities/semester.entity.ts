import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Assessment } from './assessment.entity';

@Entity()
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'boolean', default: false })
  released: boolean;

  @OneToMany(() => Assessment, (assessment) => assessment.semester)
  assessments: Assessment[];
}
