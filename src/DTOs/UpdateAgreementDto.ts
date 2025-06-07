import { PartialType } from '@nestjs/mapped-types';
import { CreateAgreementDto } from './CreateAgreementDto';

export class UpdateAgreementDto extends PartialType(CreateAgreementDto) {}