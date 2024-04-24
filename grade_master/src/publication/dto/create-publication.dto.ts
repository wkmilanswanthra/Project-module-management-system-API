import { IsNotEmpty, IsOptional, IsUrl, IsNumber } from 'class-validator';

export class CreatePublicationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  conferenceJournal: string;

  @IsOptional()
  conferenceJournalName: string;

  @IsOptional()
  issnNumber: string;

  @IsOptional()
  @IsUrl()
  rankingLink: string;

  @IsOptional()
  @IsUrl()
  scopusLink: string;

  @IsOptional()
  acceptanceLetterPath: string;

  @IsOptional()
  confirmationPhotoPath: string;

  @IsOptional()
  @IsNumber()
  registrationFee: number;

  @IsNotEmpty()
  projectId: number;

  @IsNotEmpty()
  supervisor: number;

  @IsNotEmpty()
  cosupervisor: number;

  @IsNotEmpty()
  members: number[];
}
