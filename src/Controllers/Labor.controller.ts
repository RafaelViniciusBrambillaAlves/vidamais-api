import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateLaborDto } from 'src/DTOs/CreateLaborDto';
import { UpdateLaborDto } from 'src/DTOs/UpdateLaborDto';
import { Labor } from 'src/entity/labor.entity';
import { LaborService } from 'src/Services/labor.service';

@Controller('api/labors')
export class LaborController {
  constructor(private readonly laborService: LaborService) {}

  @Post()
  create(@Body() createLaborDto: CreateLaborDto): Promise<Labor> {
    return this.laborService.create(createLaborDto);
  }

  @Get()
  findAll(): Promise<Labor[]> {
    return this.laborService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Labor> {
    return this.laborService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLaborDto: UpdateLaborDto,
  ): Promise<Labor> {
    return this.laborService.update(id, updateLaborDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.laborService.remove(id);
  }
}