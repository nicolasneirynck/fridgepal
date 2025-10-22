import { Controller, Get } from '@nestjs/common';
import { CategoryListResponseDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAllCategories(): Promise<CategoryListResponseDto> {
    return this.categoryService.getAll();
  }
}
