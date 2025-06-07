import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, DeleteDateColumn } from 'typeorm';
import { Labor } from './labor.entity';

@Entity()
export class Agreement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @ManyToMany(() => Labor, labor => labor.agreements)
  labors: Labor[];

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}