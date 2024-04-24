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
  Patch,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto, @Res() res) {
    try {
      const schedule = await this.scheduleService.create(createScheduleDto);
      return res.status(HttpStatus.CREATED).json(schedule);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get()
  async findAll(@Res() res) {
    try {
      const schedules = await this.scheduleService.findAll();
      return res.status(HttpStatus.OK).json(schedules);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res) {
    try {
      const schedule = await this.scheduleService.findOne(+id);
      if (!schedule) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Schedule not found' });
      }
      return res.status(HttpStatus.OK).json(schedule);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get('assessment/:assessmentId')
  async findScheduleByAssessmentId(
    @Param('assessmentId') assessmentId: string,
    @Res() res,
  ) {
    try {
      const schedule =
        await this.scheduleService.findScheduleByAssessmentId(+assessmentId);
      if (!schedule) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'No schedules found' });
      }
      return res.status(HttpStatus.OK).json(schedule);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateScheduleDto: CreateScheduleDto,
    @Res() res,
  ) {
    try {
      const schedule = await this.scheduleService.update(
        +id,
        updateScheduleDto,
      );
      if (!schedule) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Schedule not found' });
      }
      return res.status(HttpStatus.OK).json(schedule);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res) {
    try {
      await this.scheduleService.remove(+id);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Schedule deleted successfully' });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
