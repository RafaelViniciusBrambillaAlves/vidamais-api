import { IsNotEmpty, IsInt, IsDateString, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';

export class CreateSchedulingDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  exams: number[];

  @IsDateString()
  @IsNotEmpty()
  scheduleDate: string;
}