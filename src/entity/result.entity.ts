import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  OneToOne, 
  JoinColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { Scheduling } from './scheduling.entity';

export enum StatusResult {
  PENDENTE = 'pendente',
  DISPONIVEL = 'disponível',
  ASSINADO = 'assinado',
}

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Scheduling)
  @JoinColumn({ name: 'scheduling_id' })
  scheduling: Scheduling;

  @Column({ type: 'text', nullable: true })
  text_result: string;

  @Column({ type: 'varchar', length: 255 })
  file_result: string;

  @Column()
  date_availability: Date;

  @Column({
    type: 'enum',
    enum: StatusResult,
    default: StatusResult.PENDENTE,
  })
  status: StatusResult;

  @Column({ type: 'varchar', length: 255, nullable: true })
  digital_signature: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}