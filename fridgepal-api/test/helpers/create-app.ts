import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { DrizzleQueryErrorFilter } from '../../src/drizzle/drizzle-query-error.filter';
import { HttpExceptionFilter } from '../../src/lib/http-exception.filter';

export async function createTestApp(): Promise<INestApplication> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // verwijdert de properties die niet in de DTO staan
      forbidNonWhitelisted: true, // gooit fout als er foute properties binnenkomen
      forbidUnknownValues: true, // gooit fout bij onbekende types/waarden
      transform: true, // zett types automatisch om volgens mijn DTO types met @Transform

      exceptionFactory: (errors: ValidationError[] = []) => {
        const formattedErrors = errors.reduce(
          (acc, err) => {
            acc[err.property] = Object.values(err.constraints || {});
            return acc;
          },
          {} as Record<string, string[]>,
        );

        return new BadRequestException({
          details: { body: formattedErrors },
        });
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new DrizzleQueryErrorFilter());
  await app.init();
  return app;
}
