import { PartialType } from '@nestjs/mapped-types';
import { CreateExamDto } from './CreateExamDto';

export class UpdateExamDto extends PartialType(CreateExamDto) {}
