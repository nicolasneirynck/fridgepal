import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IngredientListResponseDto,
  IngredientResponseDto,
  CreateIngredientRequestDto,
} from './ingredient.dto';

import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';

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

  async create(
    ingredient: CreateIngredientRequestDto,
  ): Promise<IngredientResponseDto> {
    const [newIngredient] = await this.db
      .insert(ingredients)
      .values(ingredient)
      .$returningId();

    return this.getById(newIngredient.id);
  }

  async getById(id: number): Promise<IngredientResponseDto> {
    const ingredient = await this.db.query.ingredients.findFirst({
      where: eq(ingredients.id, id),
    });

    if (!ingredient) {
      throw new NotFoundException('No ingredient with this id exists');
    }

    return ingredient;
  }

  // TODO PUT EN DELETE
}
