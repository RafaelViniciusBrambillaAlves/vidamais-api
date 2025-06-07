// scheduling.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulingController } from 'src/Controllers/Scheduling.controller';
import { Exam } from 'src/entity/exam.entity';
import { Labor } from 'src/entity/labor.entity';
import { Scheduling } from 'src/entity/scheduling.entity';
import { Unit } from 'src/entity/unit.entity';
import { User } from 'src/entity/user.entity';
import { SchedulingService } from 'src/Services/scheduling.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Scheduling, 
      User, 
      Labor, 
      Unit, 
      Exam
    ]),
  ],
  controllers: [SchedulingController],
  providers: [SchedulingService],
  exports: [TypeOrmModule]
})
export class SchedulingModule {}