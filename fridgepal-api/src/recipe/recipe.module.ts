import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
