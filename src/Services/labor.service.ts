import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agreement } from 'src/entity/agreement.entity';
import { Exam } from 'src/entity/exam.entity';
import { Labor } from 'src/entity/labor.entity';
import { Repository, In } from 'typeorm';
import { CreateLaborDto } from 'src/DTOs/CreateLaborDto';
import { UpdateLaborDto } from 'src/DTOs/UpdateLaborDto';
import { Unit } from 'src/entity/unit.entity';

@Injectable()
export class LaborService {
  constructor(
    @InjectRepository(Labor)
    private laborRepository: Repository<Labor>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
    @InjectRepository(Agreement)
    private agreementRepository: Repository<Agreement>,
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}
  
  async findOne(id: number): Promise<Labor> {
    const labor = await this.laborRepository.findOne({
      where: { id },
      relations: ['exams', 'agreements', 'units'],
    });

    if (!labor) {
      throw new NotFoundException(`Laboratório com ID ${id} não encontrado`);
    }

    return labor;
  }


  async create(createLaborDto: CreateLaborDto): Promise<Labor> {
    const exams = await this.examRepository.findBy({ id: In(createLaborDto.exams) });
    const agreements = await this.agreementRepository.findBy({ id: In(createLaborDto.agreements) });

    const labor = this.laborRepository.create({
      ...createLaborDto,
      exams,
      agreements,
      units: createLaborDto.units?.map(unitDto => 
        this.unitRepository.create(unitDto)
      ),
    });

    return this.laborRepository.save(labor);
  }

  async findAll(): Promise<Labor[]> {
    return this.laborRepository.find({
      relations: ['exams', 'agreements', 'units'],
    });
  }

  async update(id: number, updateLaborDto: UpdateLaborDto): Promise<Labor> {
    const labor = await this.findOne(id);

    Object.assign(labor, {
      name: updateLaborDto.name,
      corporateName: updateLaborDto.corporateName,
      cnpj: updateLaborDto.cnpj,
      mainPhone: updateLaborDto.mainPhone,
      website: updateLaborDto.website
    });

    if (updateLaborDto.exams) {
      labor.exams = await this.examRepository.findBy({ 
        id: In(updateLaborDto.exams.map(e => e.id)) 
      });
    }

    if (updateLaborDto.agreements) {
      labor.agreements = await this.agreementRepository.findBy({ 
        id: In(updateLaborDto.agreements.map(a => a.id)) 
      });
    }

    if (updateLaborDto.units) {
      await this.unitRepository.delete({ labor: { id } }); 

      labor.units = updateLaborDto.units.map(unitDto => 
        this.unitRepository.create({ ...unitDto, labor })
      );
    }

    return this.laborRepository.save(labor);
  }

  async remove(id: number): Promise<void> {
    const labor = await this.findOne(id);
    

    await this.laborRepository.softRemove(labor);
  }
}