import { Injectable } from '@nestjs/common';
import { INGREDIENTS } from '../data/mock_data';
import { IngredientListResponseDto } from './ingredient.dto';

import {
  type DatabaseProvider,
  InjectDrizzle,
} from '../drizzle/drizzle.provider';

@Injectable()
export class IngredientService {
  constructor(
    @InjectDrizzle()
    private readonly db: DatabaseProvider,
  ) {}

  getAll(): Promise<IngredientListResponseDto> {
    const items = await this.db.query.places.findMany();
    return { items };
  }
}
