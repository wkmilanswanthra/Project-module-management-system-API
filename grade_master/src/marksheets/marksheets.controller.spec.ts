import { Test, TestingModule } from '@nestjs/testing';
import { MarksheetsController } from './marksheets.controller';
import { MarksheetsService } from './marksheets.service';

describe('MarksheetsController', () => {
  let controller: MarksheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarksheetsController],
      providers: [MarksheetsService],
    }).compile();

    controller = module.get<MarksheetsController>(MarksheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
