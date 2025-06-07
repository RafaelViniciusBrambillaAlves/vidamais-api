import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { SmsCode } from './sms-code.entity';
import { Scheduling } from './scheduling.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthDate: Date;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;

  @OneToMany(() => Scheduling, (scheduling) => scheduling.user)
  schedulings: Scheduling[];

  @Column({ default: false })
  smsVerified: boolean;

  @OneToMany(() => SmsCode, smsCode => smsCode.user)
  smsCodes: SmsCode[];
}