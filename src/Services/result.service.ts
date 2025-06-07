import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResultDto } from 'src/DTOs/CreateResultDto';
import { UpdateResultDto } from 'src/DTOs/UpdateResultDto';
import { Result, StatusResult } from 'src/entity/result.entity';
import { Scheduling } from 'src/entity/scheduling.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultadoRepository: Repository<Result>,
    
    @InjectRepository(Scheduling)
    private readonly agendamentoRepository: Repository<Scheduling>,
  ) {}

  async create(createResultadoDto: CreateResultDto): Promise<Result> {
  const agendamento = await this.agendamentoRepository.findOneBy({ 
    id: createResultadoDto.scheduleId
  });
  
  if (!agendamento) {
    throw new NotFoundException('Agendamento não encontrado');
  }

  const resultadoData = {
    ...createResultadoDto,
    scheduling: agendamento,
    date_availability: new Date(createResultadoDto.date_availability),
    status: createResultadoDto.status || StatusResult.PENDENTE
  };

  const resultado = this.resultadoRepository.create(resultadoData);
  return this.resultadoRepository.save(resultado);
}

  async findByAgendamentoId(agendamentoId: number): Promise<Result> {
    const resultado = await this.resultadoRepository.findOne({
      where: { scheduling: { id: agendamentoId } },
      relations: ['scheduling'],
    });

    if (!resultado) {
      throw new NotFoundException('Resultado não encontrado para este agendamento');
    }

    return resultado;
  }

  async update(
    id: number,
    updateResultadoDto: UpdateResultDto,
  ): Promise<Result> {
    const resultado = await this.resultadoRepository.preload({
      id,
      ...updateResultadoDto,
    });

    if (!resultado) {
      throw new NotFoundException(`Resultado com ID ${id} não encontrado`);
    }

    return this.resultadoRepository.save(resultado);
  }

  async updateResultadoArquivo(
    id: number,
    filePath: string,
  ): Promise<Result> {
    const resultado = await this.resultadoRepository.findOneBy({ id });
    
    if (!resultado) {
      throw new NotFoundException(`Resultado com ID ${id} não encontrado`);
    }

    resultado.file_result = filePath;
    resultado.status = StatusResult.DISPONIVEL;
    return this.resultadoRepository.save(resultado);
  }

  async remove(id: number): Promise<void> {
    const result = await this.resultadoRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Resultado com ID ${id} não encontrado`);
    }
  }

  // Método adicional para buscar todos resultados (se necessário)
  async findAll(): Promise<Result[]> {
    return this.resultadoRepository.find({ relations: ['agendamento'] });
  }

  async getSchedulesByUserIdAndLaborId(userId: number, laborId: number): Promise<Result[]> {
    return this.resultadoRepository.find({
      where: { scheduling: { user: { id: userId } } },
      relations: ['scheduling', 'scheduling.exams'],
    });
  }
}