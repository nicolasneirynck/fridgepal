import { Injectable } from '@nestjs/common';
import { IngredientListResponseDto } from './ingredient.dto';

import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';

import { like } from 'drizzle-orm';
import { ingredients } from '../drizzle/schema';

@Injectable()
export class IngredientService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  async getAll(filters?: {
    input?: string;
  }): Promise<IngredientListResponseDto> {
    const input = filters?.input ?? '';

    const searchString = input
      ? like(ingredients.name, `${input}%`)
      : undefined;

    const items = await this.db.query.ingredients.findMany({
      where: searchString,
    });
    return { items };
  }
}
