import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { RecipeController } from './recipe/recipe.controller';
import { IngredientController } from './ingredient/ingredient.controller';
import { RecipeService } from './recipe/recipe.service';
import { IngredientService } from './ingredient/ingredient.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    HealthController,
    RecipeController,
    IngredientController,
  ],
  providers: [AppService, RecipeService, IngredientService],
})
export class AppModule {}
