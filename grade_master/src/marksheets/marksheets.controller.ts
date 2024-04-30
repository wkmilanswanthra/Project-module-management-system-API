import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { MarksheetsService } from './marksheets.service';
import { CreateMarksheetDto } from './dto/create-marksheet.dto';
import { UpdateMarksheetDto } from './dto/update-marksheet.dto';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/helpers/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('marksheets')
export class MarksheetsController {
  constructor(private readonly marksheetsService: MarksheetsService) {}

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Body() createMarksheetDto: CreateMarksheetDto) {
    return this.marksheetsService.create(createMarksheetDto);
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/generate')
  async generateMarksheets(@Res() res: any) {
    try {
      const result = await this.marksheetsService.generateMarkSheets();
      return res.status(200).json({ message: result });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll(@Res() res) {
    try {
      const result = await this.marksheetsService.findAll();
      console.log(result);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ message: error.message });
    }
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: any) {
    try {
      const result = await this.marksheetsService.findOne(+id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarksheetDto: UpdateMarksheetDto,
  ) {
    return this.marksheetsService.update(+id, updateMarksheetDto);
  }

  @Roles('PROJECT_COORDINATOR')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marksheetsService.remove(+id);
  }
}
