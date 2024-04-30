import { PartialType } from '@nestjs/swagger';
import { CreateMarksheetDto } from './create-marksheet.dto';

export class UpdateMarksheetDto extends PartialType(CreateMarksheetDto) {}
