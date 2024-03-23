import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './auth/helpers/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProjectModule } from './project/project.module';
import { AssessmentModule } from './assessment/assessment.module';
import { RubricModule } from './rubric/rubric.module';
import { SubmissionModule } from './submission/submission.module';
import { MarksModule } from './marks/marks.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PublicationModule } from './publication/publication.module';

const database = TypeOrmModule.forRoot({
  type: (process.env.DB_TYPE as any) || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'grade_master',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
});

@Module({
  imports: [
    ConfigModule.forRoot(),
    database,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
    }),
    ProjectModule,
    AssessmentModule,
    RubricModule,
    SubmissionModule,
    MarksModule,
    ScheduleModule,
    PublicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
