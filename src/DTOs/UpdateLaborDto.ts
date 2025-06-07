import { PartialType } from '@nestjs/mapped-types';
import { CreateLaborDto } from './CreateLaborDto';

export class UpdateLaborDto extends PartialType(CreateLaborDto) {}