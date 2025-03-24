import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { DocumentModule } from './document/document.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    DocumentModule,
    AuthModule,
  ],
})
export class AppModule {}

// Document Controller (document.controller.ts)
import { Controller, Post, UseInterceptors, UploadedFile, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.documentService.processDocument(file);
  }

  @Get(':id')
  async getDocument(@Param('id') id: string) {
    return this.documentService.getDocument(id);
  }
}

// Document Service (document.service.ts)
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async processDocument(file: Express.Multer.File) {
    const extractedText = await this.performOCR(file);
    return this.prisma.document.create({
      data: {
        filePath: file.path,
        extractedText,
        userId: 'dummy-user-id', // Substituir com ID real após implementar autenticação
      },
    });
  }

  async performOCR(file: Express.Multer.File): Promise<string> {
    // Integrar ferramenta OCR aqui (ex.: Tesseract.js)
    return 'Texto extraído de exemplo';
  }

  async getDocument(id: string) {
    return this.prisma.document.findUnique({
      where: { id },
      include: { interactions: true },
    });
  }
}
