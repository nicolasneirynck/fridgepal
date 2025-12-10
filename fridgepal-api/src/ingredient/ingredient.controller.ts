import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import {
  IngredientListResponseDto,
  CreateIngredientRequestDto,
  IngredientResponseDto,
} from './ingredient.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('ingredients')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Unauthorized - you need to be signed in',
})
@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @ApiResponse({
    status: 200,
    description: 'Get all ingredients',
    type: IngredientListResponseDto,
  })
  @Get()
  async getAllIngredients(
    @Query('search') input?: string,
  ): Promise<IngredientListResponseDto> {
    return this.ingredientService.getAll({ input });
  }

  @ApiResponse({
    status: 201,
    description: 'Create ingredient',
    type: IngredientResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Post()
  @Roles(Role.ADMIN)
  async createIngredient(
    @Body() createIngredientDto: CreateIngredientRequestDto,
  ): Promise<IngredientResponseDto> {
    return await this.ingredientService.create(createIngredientDto);
  }

  @ApiResponse({
    status: 204,
    description: 'Ingredient successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Ingredient not found',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - only admins can delete ingredients',
  })
  @Delete(':id')
  @HttpCode(204)
  @Roles(Role.ADMIN)
  async deleteIngredient(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.ingredientService.deleteById(id);
  }

  // TODO PUT
}
