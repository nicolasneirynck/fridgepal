import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoryListResponseDto } from './category.dto';
import { CategoryService } from './category.service';
import { CreateCategoryRequestDto, CategoryResponseDto } from './category.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/roles';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('categories')
@ApiBearerAuth()
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiResponse({
    status: 200,
    description: 'Get all categories',
    type: CategoryListResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Categorie not found',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @Get()
  async getAllCategories(): Promise<CategoryListResponseDto> {
    return this.categoryService.getAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Create category',
    type: CategoryResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - you need to be signed in',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @Post()
  @Roles(Role.ADMIN)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @HttpCode(204)
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
