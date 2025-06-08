import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ExamService } from 'src/Services/exam.service';
import { CreateExamDto } from 'src/DTOs/CreateExamDto';
import { UpdateExamDto } from 'src/DTOs/UpdateExamDto';

@Controller('api/exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post()
  create(@Body() createExamDto: CreateExamDto) {
    return this.examService.create(createExamDto);
  }

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto) {
    return this.examService.update(+id, updateExamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examService.remove(+id);
  }
}
