import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
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
import { Role } from '../auth/roles';

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

  // TODO duplicaties vermijden
  // op letten ook met bv "paprika" of "PaPrika" of..
  async create(
    ingredient: CreateIngredientRequestDto,
  ): Promise<IngredientResponseDto> {
    ingredient.name = ingredient.name.trim();

    try {
      const [newIngredient] = await this.db
        .insert(ingredients)
        .values(ingredient)
        .$returningId();

      return this.getById(newIngredient.id);
    } catch (error: unknown) {
      const err = error as { cause?: { code?: string; errno?: number } };

      const code = err.cause?.code;
      const errno = err.cause?.errno;

      if (code === 'ER_DUP_ENTRY' || errno === 1062) {
        throw new ConflictException(
          'An ingredient with this name already exists',
        );
      }

      throw new InternalServerErrorException('Could not create ingredient.');
    }
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

  // TODO PUT
  async deleteById(id: number): Promise<void> {
    const existingIngredient = await this.db.query.ingredients.findFirst({
      where: eq(ingredients.id, id),
    });

    if (!existingIngredient) {
      throw new NotFoundException('No ingredient with this id exists');
    }

    await this.db.delete(ingredients).where(eq(ingredients.id, id));
  }
}
