// src/Services/agreement.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agreement } from '../entity/agreement.entity';
import { CreateAgreementDto } from '../DTOs/CreateAgreementDto';
import { UpdateAgreementDto } from '../DTOs/UpdateAgreementDto';

@Injectable()
export class AgreementService {
  constructor(
    @InjectRepository(Agreement)
    private agreementRepository: Repository<Agreement>,
  ) {}

  async create(createAgreementDto: CreateAgreementDto): Promise<Agreement> {
    const agreement = this.agreementRepository.create(createAgreementDto);
    return this.agreementRepository.save(agreement);
  }

  findAll(): Promise<Agreement[]> {
    return this.agreementRepository.find();
  }

  async findOne(id: number): Promise<Agreement> {
    const agreement = await this.agreementRepository.findOneBy({ id });
    if (!agreement) {
      throw new NotFoundException(`Agreement with ID ${id} not found`);
    }
    return agreement;
  }

  async update(id: number, updateAgreementDto: UpdateAgreementDto): Promise<Agreement> {
    const agreement = await this.findOne(id);
    Object.assign(agreement, updateAgreementDto);
    return this.agreementRepository.save(agreement);
  }

  async remove(id: number): Promise<void> {
    const agreement = await this.findOne(id);
    await this.agreementRepository.softRemove(agreement);
  }
}