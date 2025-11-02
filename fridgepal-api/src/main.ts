import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerConfig, CorsConfig } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService<ServerConfig | CorsConfig>);
  const port = config.get<number>('port')!;
  const cors = config.get<CorsConfig>('cors')!;

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // verwijdert de properties die niet in de DTO staan
      forbidNonWhitelisted: true, // gooit fout als er foute properties binnenkomen
      forbidUnknownValues: true, // gooit fout bij onbekende types/waarden
      transform: true,

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

  app.enableCors({
    origins: cors.origins,
    maxAge: cors.maxAge,
  });

  await app.listen(port);
}

bootstrap();
