import { Injectable } from '@nestjs/common';
import { CategoryListResponseDto } from './category.dto';

import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';

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
}
