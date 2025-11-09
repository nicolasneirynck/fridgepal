import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryListResponseDto } from './category.dto';
import { CategoryService } from './category.service';
import { CreateCategoryRequestDto, CategoryResponseDto } from './category.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAllCategories(): Promise<CategoryListResponseDto> {
    return this.categoryService.getAll();
  }

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return await this.categoryService.create(createCategoryDto);
  }

  // TODO PUT en DELETE voor ingredient
}
