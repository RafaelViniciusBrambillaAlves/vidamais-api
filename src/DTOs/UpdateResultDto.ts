import { IsOptional, IsString, IsDate } from 'class-validator';
import { StatusResult } from 'src/entity/result.entity';

export class UpdateResultDto {
  @IsOptional()
  @IsString()
  text_result?: string;

  @IsOptional()
  @IsString()
  file_result?: string;

  @IsOptional()
  @IsDate()
  data_availability?: Date;

  @IsOptional()
  @IsString()
  status?: StatusResult;

  @IsOptional()
  @IsString()
  digital_signature?: string;
}