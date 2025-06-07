import { IsString, IsNotEmpty, Length, IsArray, IsOptional } from 'class-validator';
import { Agreement } from 'src/entity/agreement.entity';
import { Exam } from 'src/entity/exam.entity';
import { Unit } from 'src/entity/unit.entity';

export class CreateLaborDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  corporateName: string;

  @IsString()
  @IsNotEmpty()
  @Length(14, 14)
  cnpj: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 15)
  mainPhone: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsArray()
  @IsOptional()
  exams: Array<Exam>;

  @IsArray()
  @IsOptional()
  agreements: Array<Agreement>;

  @IsArray()
  @IsOptional()
  units: Array<Unit>;
}