import { PartialType } from '@nestjs/mapped-types';
import { CreateUnitDto } from './CreateUnitDto';

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}