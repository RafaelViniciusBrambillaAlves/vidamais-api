import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Labor } from './entity/labor.entity';
import { Exam } from './entity/exam.entity';
import { Agreement } from './entity/agreement.entity';
import { LaborController } from './Controllers/Labor.controller';
import { LaborService } from './Services/labor.service';
import { Unit } from './entity/unit.entity';
import { SchedulingController } from './Controllers/Scheduling.controller';
import { ResultController } from './Controllers/Result.controller';
import { ResultService } from './Services/result.service';
import { SchedulingService } from './Services/scheduling.service';
import { Result } from './entity/result.entity';
import { Scheduling } from './entity/scheduling.entity';
import { SchedulingModule } from './modules/SchedulingModule';
import { ExamController } from './Controllers/Exam.controller';
import { ExamService } from './services/exam.service';
import { AgreementController } from './Controllers/Agreement.controller'; 
import { AgreementService } from './Services/agreement.service';
import { FilesController } from './Controllers/Files.Controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([Labor, Exam, Agreement, Unit, Agreement, Result]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    SchedulingModule,
    AuthModule,
  ],
  controllers: [LaborController, ResultController, ExamController, AgreementController, FilesController],
  providers: [LaborService, ResultService, ExamService, AgreementService ],
})
export class AppModule {}