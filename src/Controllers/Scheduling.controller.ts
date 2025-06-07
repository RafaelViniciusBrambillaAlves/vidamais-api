import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateSchedulingDto } from 'src/DTOs/UpdateSchedulingDto';
import { CreateSchedulingDto } from 'src/DTOs/CreateSchedulingDto'; 
import { Scheduling } from 'src/entity/scheduling.entity';
import { SchedulingService } from 'src/Services/scheduling.service';

@Controller('api/schedule')
export class SchedulingController {
  constructor(private readonly agendamentoService: SchedulingService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createAgendamentoDto: CreateSchedulingDto,
  ): Promise<Scheduling> {
    return this.agendamentoService.create(createAgendamentoDto);
  }

  @Get()
  async findAll(): Promise<Scheduling[]> {
    return this.agendamentoService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Scheduling> {
    return this.agendamentoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAgendamentoDto: UpdateSchedulingDto,
  ): Promise<Scheduling> {
    return this.agendamentoService.update(id, updateAgendamentoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.agendamentoService.remove(id);
  }

  @Patch(':id/cancelar')
  async cancelarAgendamento(
    @Param('id', ParseIntPipe) id: number,
    @Body('motivo') motivo: string,
  ): Promise<Scheduling> {
    return this.agendamentoService.cancelarAgendamento(id, motivo);
  }

  @Get(':userId/:laborId')
  async getSchedulesByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('laborId', ParseIntPipe) laborId: number,
  ): Promise<Scheduling[]> {
    return this.agendamentoService.getSchedulesByUserIdAndLaborId(userId, laborId);
  }
}