import { Test, TestingModule } from '@nestjs/testing';
import { MarksheetsService } from './marksheets.service';

describe('MarksheetsService', () => {
  let service: MarksheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarksheetsService],
    }).compile();

    service = module.get<MarksheetsService>(MarksheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
