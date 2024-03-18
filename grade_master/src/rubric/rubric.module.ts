import { Module } from '@nestjs/common';
import { RubricService } from './rubric.service';
import { RubricController } from './rubric.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubric } from './entities/rubric.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rubric])],
  controllers: [RubricController],
  providers: [RubricService],
})
export class RubricModule {}
