// submission.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createSubmissionDto: CreateSubmissionDto,
    @UploadedFile() file,
    @Res() res,
  ) {
    try {
      console.log('file', file);
      console.log('createSubmissionDto', createSubmissionDto);
      const submission = await this.submissionService.create(
        createSubmissionDto,
        file,
      );
      return res.status(HttpStatus.CREATED).json(submission);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll() {
    return this.submissionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.submissionService.findOne(+id);
  }

  @Get('project/:projectId')
  async findAllSubmissionsByProjectId(
    @Param('projectId') projectId: string,
    @Res() res: any,
  ) {
    try {
      console.log('projectId', projectId);
      const submissions =
        await this.submissionService.findAllSubmissionsByProjectId(+projectId);
      if (!submissions.length) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'No submissions found' });
      }
      return res.status(HttpStatus.OK).json(submissions);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      await this.submissionService.remove(+id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Submission deleted successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
