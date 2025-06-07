import {
  IsArray,
  ArrayNotEmpty,
  IsInt,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class UpdateSchedulingDto {
  @IsNotEmpty()
  @IsDateString()
  scheduleDate: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  exams: number[];
}