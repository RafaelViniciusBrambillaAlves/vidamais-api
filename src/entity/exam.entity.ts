import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Labor } from './labor.entity';
import { Scheduling } from './scheduling.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @ManyToMany(() => Labor, (labor) => labor.exams)
  labors: Labor[];

  @ManyToMany(() => Scheduling, (scheduling) => scheduling.exams)
  schedulings: Scheduling[];
}
