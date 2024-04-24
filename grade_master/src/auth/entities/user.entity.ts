import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role, Specialization } from '../interface/auth.interface';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column('varchar', { array: true, default: [Role.STUDENT] })
  role: string[];

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
    enum: Specialization,
  })
  specialization: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  batch: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  position: string;

  @Column({ type: 'varchar', length: 30 })
  contact: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  address: string;

  @Column({ type: 'json', nullable: true })
  al: any;

  @Column({ type: 'json', nullable: true })
  guardian: any;

  @Column({ type: 'varchar', length: 30, nullable: true, unique: true })
  registrationNumber: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;
}
