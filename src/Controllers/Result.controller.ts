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
} from '@nestjs/common';
import { CreateResultDto } from 'src/DTOs/CreateResultDto';
import { UpdateResultDto } from 'src/DTOs/UpdateResultDto';
import { Result } from 'src/entity/result.entity';
import { ResultService } from 'src/Services/result.service';

@Controller('/api/result')
export class ResultController {
  constructor(private readonly resultadoService: ResultService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createResultadoDto: CreateResultDto,
  ): Promise<Result> {
    return this.resultadoService.create(createResultadoDto);
  }

  @Get('scheduling/:agendamentoId')
  async findByAgendamento(
    @Param('agendamentoId', ParseIntPipe) agendamentoId: number,
  ): Promise<Result> {
    return this.resultadoService.findByAgendamentoId(agendamentoId);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResultadoDto: UpdateResultDto,
  ): Promise<Result> {
    return this.resultadoService.update(id, updateResultadoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    return this.resultadoService.remove(id);
  }

  // Endpoint para upload de arquivo (exemplo simplificado)
  @Post(':id/upload')
  async uploadResultado(
    @Param('id', ParseIntPipe) id: number,
    @Body('filePath') filePath: string,
  ): Promise<Result> {
    return this.resultadoService.updateResultadoArquivo(id, filePath);
  }

  // result.controller.ts
  @Get('user/:userId/:laborId')
    async getSchedulesByUser(
      @Param('userId', ParseIntPipe) userId: number,
      @Param('laborId', ParseIntPipe) laborId: number,
  ): Promise<Result[]> {
    return this.resultadoService.getSchedulesByUserIdAndLaborId(userId, laborId);
  }
}