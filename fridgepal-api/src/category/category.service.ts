import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CategoryListResponseDto,
  CategoryResponseDto,
  CreateCategoryRequestDto,
} from './category.dto';
import { eq } from 'drizzle-orm';

import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { categories } from '../drizzle/schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(): Promise<CategoryListResponseDto> {
    const items = await this.db.query.categories.findMany();
    return { items };
  }

  async create(
    category: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    const [newCategory] = await this.db
      .insert(categories)
      .values(category)
      .$returningId();

    return this.getById(newCategory.id);
  }

  async getById(id: number): Promise<CategoryResponseDto> {
    const category = await this.db.query.categories.findFirst({
      where: eq(categories.id, id),
    });

    if (!category) {
      throw new NotFoundException('No category with this id exists');
    }

    return category;
  }

  // TODO -> edit en delete
}
