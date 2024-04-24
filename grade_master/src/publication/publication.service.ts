import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Publication } from './entities/publication.entity';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
  ) {}

  async create(createPublicationDto: CreatePublicationDto): Promise<any> {
    const publication = this.publicationRepository.create(createPublicationDto);
    console.log('mem', publication.members);
    console.log('publication', publication);
    return await this.publicationRepository.save(publication);
    throw new Error('No files found');
  }

  async findAll(): Promise<Publication[]> {
    return await this.publicationRepository.find();
  }

  async findOne(id: number): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { id },
    });
    if (!publication) {
      throw new NotFoundException(`Publication with id ${id} not found`);
    }
    return publication;
  }

  async update(
    id: number,
    updatePublicationDto: UpdatePublicationDto,
  ): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { id },
    });
    Object.assign(publication, updatePublicationDto);
    return await this.publicationRepository.save(publication);
  }

  async remove(id: number): Promise<void> {
    const publication = await this.publicationRepository.findOne({
      where: { id },
    });
    await this.publicationRepository.remove(publication);
  }

  private async storeFile(file): Promise<string> {
    if (!file) {
      return null;
    }
    console.log('file', file);
    const timestamp = new Date().getTime();
    const originalName = file;
    const uniqueFileName = `${timestamp}_${originalName}`;

    const uploadDir = path.join(__dirname, '..', 'uploads');
    console.log('uploadDir', uploadDir);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFileName);
    try {
      fs.writeFileSync(filePath, file.buffer);
    } catch (error) {
      throw new Error(error);
    }
    return filePath;
  }
}
