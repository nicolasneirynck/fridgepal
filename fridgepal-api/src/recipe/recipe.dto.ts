export class RecipeDto {
  name: string;
  description: string;
  imageUrl: string | null; // niet verplicht -> default afbeelding tonen
  time: number;
  categories: { id: number; name: string }[];
}

// request
export class CreateRecipeRequestDto extends RecipeDto {
  createdBy: { id: number; userName: string };
  ingredientsDetailed: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: {
    id: number;
    stepNumber: number;
    description: string;
  }[];
}

export class UpdateRecipeRequestDto extends CreateRecipeRequestDto {
  id: number;
  ratings: {
    userId: number;
    userName: string;
    rating: number;
  }[];
  ingredients: string[];
  ratingSummary: { average: number; count: number };
}

// response
export class RecipeShortResponseDto extends RecipeDto {
  id: number;
  createdBy: { id: number; userName: string };
  ingredients: string[];
  ratingSummary: { average: number; count: number };
}

export class RecipeDetailResponseDto extends RecipeShortResponseDto {
  ingredientsDetailed: {
    id: number;
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: {
    id: number;
    stepNumber: number;
    description: string;
  }[];
  ratings: {
    userId: number;
    userName: string;
    rating: number;
  }[];
}

export class RecipeListResponseDto {
  items: RecipeShortResponseDto[];
}
