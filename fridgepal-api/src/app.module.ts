import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import configuration from './config/configuration';
import { LoggerMiddleware } from './lib/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    RecipeModule,
    IngredientModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    DrizzleModule,
    UserModule,
    CategoryModule,
    AuthModule,
    SessionModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
  }
}
