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
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
  }
}
