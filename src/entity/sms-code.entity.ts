import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class SmsCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, user => user.smsCodes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  verified: boolean;
}