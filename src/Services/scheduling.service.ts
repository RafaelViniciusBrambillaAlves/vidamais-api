import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchedulingDto } from 'src/DTOs/CreateSchedulingDto';
import { UpdateSchedulingDto } from 'src/DTOs/UpdateSchedulingDto';
import { Exam } from 'src/entity/exam.entity';
import { Labor } from 'src/entity/labor.entity';
import { Scheduling, SchedulingStatus } from 'src/entity/scheduling.entity';
import { Unit } from 'src/entity/unit.entity';
import { User } from 'src/entity/user.entity';
import { In, IsNull, Repository } from 'typeorm';

@Injectable()
export class SchedulingService {
  constructor(
    @InjectRepository(Scheduling)
    private schedulingRepository: Repository<Scheduling>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Labor)
    private laborRepository: Repository<Labor>,

    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,

    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  private gerarCodigoConfirmacao(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  // CREATE
  async create(dto: CreateSchedulingDto): Promise<Scheduling> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    const exams = await this.examRepository.findBy({ id: In(dto.exams) });

    if (!user || exams.length === 0) {
      throw new NotFoundException('Usuário ou exames não encontrados');
    }

    const newScheduling = this.schedulingRepository.create({
      user,
      exams,
      scheduling_date: new Date(dto.scheduleDate),
      status: SchedulingStatus.AGENDADO,
      confirm_code: this.gerarCodigoConfirmacao(),
    });

    return this.schedulingRepository.save(newScheduling);
  }

  async findAll(): Promise<Scheduling[]> {
    return this.schedulingRepository.find();
  }

  async findOne(id: number): Promise<Scheduling> {
    const scheduling = await this.schedulingRepository.findOneBy({ 
      id,

    });
    if (!scheduling) throw new NotFoundException('Scheduling não encontrado');
    return scheduling;
  }

  // DELETE
  async remove(id: number): Promise<void> {
    const scheduling = await this.schedulingRepository.findOneBy({ id });
    if (!scheduling) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    await this.schedulingRepository.delete(id);
  }

  // CANCELAR AGENDAMENTO 
  async cancelarAgendamento(id: number, motivo: string): Promise<Scheduling> {
    const agendamento = await this.schedulingRepository.findOne({
      where: { id },
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (agendamento.status === SchedulingStatus.CANCELADO) {
      throw new BadRequestException('Agendamento já está cancelado');
    }

    agendamento.status = SchedulingStatus.CANCELADO;
    agendamento.cancellation_reason = motivo;
    agendamento.cancellation_date = new Date();

    return this.schedulingRepository.save(agendamento);
  }

  async update(id: number, dto: UpdateSchedulingDto): Promise<Scheduling> {
    const agendamento = await this.schedulingRepository.findOne({
      where: { id },
      relations: ['exams'],
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (agendamento.status !== SchedulingStatus.AGENDADO) {
      throw new BadRequestException('Só é possível editar agendamentos com status AGENDADO');
    }

    const novaData = new Date(dto.scheduleDate);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (novaData <= hoje) {
      throw new BadRequestException('A nova data deve ser a partir de amanhã');
    }

    const novosExames = await this.examRepository.findBy({ id: In(dto.exams) });

    if (novosExames.length === 0) {
      throw new BadRequestException('Exames inválidos');
    }

    // Atualiza os exames (substitui completamente)
    agendamento.exams = novosExames;

    // Atualiza a data e a timestamp de atualização
    agendamento.scheduling_date = novaData;
    agendamento.updatedAt = new Date();

    return this.schedulingRepository.save(agendamento);
  }

  async getSchedulesByUserIdAndLaborId(userId: number, laborId: number): Promise<Scheduling[]> {
    return this.schedulingRepository.find({
      where: { 
        user: { id: userId },
      },
      relations: ['exams'],
    });
  }
}