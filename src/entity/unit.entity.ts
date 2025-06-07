import { Labor } from 'src/entity/labor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from 'typeorm';

@Entity()
export class Unit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column('text')
  address: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ name: 'opening_time', type: 'time' })
  openingTime: string;

  @Column({ name: 'closing_time', type: 'time' })
  closingTime: string;

  @ManyToOne(() => Labor, labor => labor.units)
  labor: Labor;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}