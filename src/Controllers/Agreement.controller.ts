// src/Controllers/Agreement.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AgreementService } from '../Services/agreement.service';
import { CreateAgreementDto } from '../DTOs/CreateAgreementDto';
import { UpdateAgreementDto } from '../DTOs/UpdateAgreementDto';
import { Agreement } from '../entity/agreement.entity';

@Controller('api/agreements')
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  @Post()
  create(@Body() createAgreementDto: CreateAgreementDto): Promise<Agreement> {
    return this.agreementService.create(createAgreementDto);
  }

  @Get()
  findAll(): Promise<Agreement[]> {
    return this.agreementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Agreement> {
    return this.agreementService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgreementDto: UpdateAgreementDto,
  ): Promise<Agreement> {
    return this.agreementService.update(+id, updateAgreementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.agreementService.remove(+id);
  }
}