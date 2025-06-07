import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { StatusResult } from "src/entity/result.entity";

export class CreateResultDto {
  @IsNotEmpty()
  scheduleId: number;

  @IsOptional()
  @IsString()
  text_result?: string;

  @IsNotEmpty()
  @IsString()
  file_result: string;

  @IsNotEmpty()
  @IsDateString()
  date_availability: string;

  @IsOptional()
  @IsEnum(StatusResult)
  status?: StatusResult;

  @IsOptional()
  @IsString()
  digital_signature?: string;
}