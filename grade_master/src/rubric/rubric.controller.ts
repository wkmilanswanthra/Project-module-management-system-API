import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RubricService } from './rubric.service';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { Response } from 'express';

@Controller('rubrics')
export class RubricController {
  constructor(private readonly rubricService: RubricService) {}

  @Post()
  async create(@Body() createRubricDto: CreateRubricDto, @Res() res: Response) {
    try {
      const createdRubric = await this.rubricService.create(createRubricDto);
      return res.status(HttpStatus.CREATED).json(createdRubric);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const rubrics = await this.rubricService.findAll();
      return res.status(HttpStatus.OK).json(rubrics);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const rubric = await this.rubricService.findOne(+id);
      if (!rubric) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Rubric not found' });
      }
      return res.status(HttpStatus.OK).json(rubric);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRubricDto: CreateRubricDto,
    @Res() res: Response,
  ) {
    try {
      const updatedRubric = await this.rubricService.update(
        +id,
        updateRubricDto,
      );
      if (!updatedRubric) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Rubric not found' });
      }
      return res.status(HttpStatus.OK).json(updatedRubric);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.rubricService.remove(+id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Rubric deleted successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error' });
    }
  }
}
