import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exam } from './exam.entity';
import { Unit } from './unit.entity';

export enum SchedulingStatus {
  AGENDADO = 'agendado',
  CANCELADO = 'cancelado',
  REALIZADO = 'realizado',
}

@Entity()
export class Scheduling {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.schedulings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  scheduling_date: Date;

  @Column({
    type: 'enum',
    enum: SchedulingStatus,
    default: SchedulingStatus.AGENDADO,
  })
  status: SchedulingStatus;

  @Column({ type: 'varchar', length: 12, unique: true })
  confirm_code: string;

  @Column({ type: 'text', nullable: true })
  cancellation_reason: string;

  @Column({ name: 'cancellation_date', type: 'timestamp', nullable: true })
  cancellation_date: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Exam)
  @JoinTable({
    name: 'scheduling_exams',
    joinColumn: { name: 'scheduling_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'exam_id', referencedColumnName: 'id' },
  })
  exams: Exam[];
  unit: Unit;
}
