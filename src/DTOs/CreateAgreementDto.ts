// src/DTOs/CreateAgreementDto.ts
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateAgreementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isActive: boolean;
}
