import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { RecipeModule } from './recipe/recipe.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { UserModule } from './user/user.module';
import configuration from './config/configuration';

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
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
