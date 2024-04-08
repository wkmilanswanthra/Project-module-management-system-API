import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { MarksService } from './marks.service';
import { CreateMarkDto } from './dto/create-mark.dto';

@Controller('marks')
export class MarksController {
  constructor(private readonly markService: MarksService) {}

  @Post()
  async create(@Body() createMarkDto: CreateMarkDto, @Res() res) {
    try {
      const mark = await this.markService.create(createMarkDto);
      return res.status(HttpStatus.CREATED).json(mark);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const marks = await this.markService.findAll();
      return res.status(HttpStatus.OK).json(marks);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const mark = await this.markService.findOne(+id);
      if (!mark) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Mark not found' });
      }
      return res.status(HttpStatus.OK).json(mark);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get('submission/:submissionId')
  async findBySubmissionId(
    @Param('submissionId') submissionId: string,
    @Res() res,
  ) {
    try {
      const marks = await this.markService.findBySubmissionId(+submissionId);
      return res.status(HttpStatus.OK).json(marks);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMarkDto: any,
    @Res() res,
  ) {
    try {
      console.log('updateMarkDto', updateMarkDto);
      const mark = await this.markService.update(+id, updateMarkDto);
      if (!mark) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Mark not found' });
      }
      return res.status(HttpStatus.OK).json(mark);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      await this.markService.remove(+id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Mark deleted successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
