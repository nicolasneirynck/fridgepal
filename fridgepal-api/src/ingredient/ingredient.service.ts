import { Injectable } from '@nestjs/common';
import { INGREDIENTS } from '../data/mock_data';
import {
  IngredientResponseDto,
  IngredientListResponseDto,
} from './ingredient.dto';
@Injectable()
export class IngredientService {
  getAll(): IngredientListResponseDto {
    return { items: INGREDIENTS };
  }
}
