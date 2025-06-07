import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, DeleteDateColumn } from 'typeorm';
import { Unit } from './unit.entity';
import { Exam } from './exam.entity';
import { Agreement } from './agreement.entity';

@Entity()
export class Labor {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'corporate_name', length: 150 })
  corporateName: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column({ name: 'main_phone', length: 15 })
  mainPhone: string;

  @Column({ nullable: true, length: 100 })
  website?: string;

  @OneToMany(() => Unit, unit => unit.labor)
  units: Unit[];

  @ManyToMany(() => Exam, exam => exam.labors)
  @JoinTable({ name: 'labor_exams' })
  exams: Exam[];

  @ManyToMany(() => Agreement, agreement => agreement.labors)
  @JoinTable({ name: 'labor_agreements' })
  agreements: Agreement[];

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date;

  @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}