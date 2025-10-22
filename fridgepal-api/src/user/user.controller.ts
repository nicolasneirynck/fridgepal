import { Controller, Get, Param } from '@nestjs/common';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeShortResponseDto } from '../recipe/recipe.dto';

@Controller('users')
export class UserController {
  constructor(private recipeService: RecipeService) {}

  @Get('/:id/favoriterecipes')
  async getFavoritePlaces(
    @Param('id') id: string,
  ): Promise<RecipeShortResponseDto[]> {
    return await this.recipeService.getFavoriteRecipesByUserId(Number(id));
  }
}
