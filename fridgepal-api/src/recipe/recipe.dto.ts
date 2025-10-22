// TODO kijken voor overerving NIET DRINGEND

// RESPONSES
export class RecipeShortResponseDto {
  id: number;
  name: string;
  imageUrl: string | null; // niet verplicht -> front-end voorziet default afbeelding
  createdBy: {
    id: number; // id  nodig?
    userName: string;
  };
  ingredients: string[];
  time: number; // voor later filter
  categories: {
    id: number; //id nodig?
    name: string;
  }[]; // voor later filter;
  // ratings?:
  //   | {
  //       userId: number;
  //       userName: string;
  //       rating: number;
  //     }[]
  //   | null; // als nog geen stemmen
  // ratingSummary?: {
  //   average: number;
  //   count: number;
} // voor later filter

export class RecipeListResponseDto {
  items: RecipeShortResponseDto[];
}
export class RecipeDetailResponseDto {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null; // niet verplicht -> front-end voorziet default afbeelding
  time: number;
  createdBy: {
    id: number; // id miss zinvol later?
    userName: string;
  };
  createdAt: Date;
  ingredients: {
    name: string;
    amount: number;
    unit: string;
  }[];
  instructions: {
    stepNumber: number;
    description: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[]; // voor later filter; id nodig?
  //rating: xx
  // ratingSummary: {
  //   average: number | null;
  //   count: number;
  // };
}

// REQUESTS
export class CreateRecipeRequestDto {
  name: string;
  description: string | null;
  imageUrl: string | null;
  time: number;
  createdBy: {
    id: number;
  };
  ingredients: {
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
  categories: {
    id: number;
    name: string;
  }[];
}

export class UpdateRecipeRequestDto extends CreateRecipeRequestDto {}
