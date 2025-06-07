// src/files/files.controller.ts
import { Controller, Get, Param, NotFoundException, StreamableFile, Header } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Controller('files')
export class FilesController {
  private readonly basePath = join(__dirname, '../../uploads/results');

  @Get(':filename')
  @Header('Content-Type', 'application/octet-stream')
  async serveFile(@Param('filename') filename: string): Promise<StreamableFile> {
    const filePath = join(this.basePath, filename);

    if (!existsSync(filePath)) {
      throw new NotFoundException(`Arquivo "${filename}" não encontrado`);
    }

    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
}
