import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common';
import { PublicationService } from './publication.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const editFileName = (req, file, callback) => {
  const fileExtName = extname(file.originalname); // Get the file extension
  const randomName = uuidv4(); // Generate a unique random name using uuid
  const newFileName = `${randomName}${fileExtName}`; // Combine the unique name with the original file extension
  callback(null, newFileName); // Call the callback function with the new filename
};

@Controller('publications')
export class PublicationController {
  constructor(private readonly publicationService: PublicationService) {}

  @Post()
  async create(@Body() createPublicationDto: CreatePublicationDto) {
    try {
      console.log('createPublicationDto con', createPublicationDto);
      const createdPublication =
        await this.publicationService.create(createPublicationDto);
      return {
        message: 'Publication created successfully',
        publication: createdPublication,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // @Post()
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'acceptanceLetter', maxCount: 1 },
  //     { name: 'confirmationPhoto', maxCount: 1 },
  //   ]),
  // )
  // async create(@UploadedFiles() files, @Body() formData: any) {
  //   console.log('Received FormData:', formData);
  //   console.log('Received Files:', files);
  //   try {
  //     const createdPublication = await this.publicationService.create(
  //       formData,
  //       files,
  //     );
  //     return {
  //       message: 'Publication created successfully',
  //       publication: createdPublication,
  //     };
  //   } catch (error) {
  //     throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  async uploadFile(@UploadedFile() file) {
    console.log('Received Files:', file);
    return { message: 'Files uploaded successfully', file };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const publication = await this.publicationService.findOne(+id);
      if (!publication) {
        throw new HttpException('Publication not found', HttpStatus.NOT_FOUND);
      }
      return { publication };
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve publication',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ) {
    try {
      const updatedPublication = await this.publicationService.update(
        +id,
        updatePublicationDto,
      );
      return {
        message: 'Publication updated successfully',
        publication: updatedPublication,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update publication',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.publicationService.remove(+id);
      return { message: 'Publication deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Failed to delete publication',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
