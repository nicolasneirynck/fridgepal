export interface Recipe {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  time: number;
  createdBy: { id: number; userName: string };
  ingredients: string[];
  categories: { id: number; name: string }[];
  ratingSummary: { average: number; count: number }; // miss toch ratings tonen op recipe cards?
}

export interface RecipeDetail extends Recipe {
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

export interface Ingredient {
  id: number;
  name: string;
}

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: 'Spaghetti Bolognese',
    description:
      'Een klassiek Italiaans gerecht met rijke tomatensaus en rundergehakt. Perfect voor een snelle maar voedzame maaltijd.',
    imageUrl:
      'https://www.flora.com/en-gb/-/media/Project/Upfield/Brands/Flora/Flora-UK-New/Assets/Recipes/Sync-Images/008d0080-e15e-431e-ada0-d962c3cc073b.jpg',
    time: 45,
    createdBy: {
      id: 2,
      userName: 'chefMario',
    },
    ingredients: ['Spaghetti', 'Rundergehakt', 'Tomatensaus', 'Ui', 'Knoflook'],
    categories: [
      { id: 1, name: 'Italiaans' },
      { id: 2, name: 'Hoofdgerecht' },
    ],
    ratingSummary: { average: 4.6, count: 128 },
  },
  {
    id: 2,
    name: 'Vegetarische Curry',
    description:
      'Een romige curry met kikkererwten en kokosmelk, boordevol groenten en smaak. Ideaal voor vegetariërs en liefhebbers van comfort food.',
    imageUrl:
      'https://hips.hearstapps.com/hmg-prod/images/chicken-curry-lead-65a1629b408b0.jpg',
    time: 30,
    createdBy: {
      id: 1,
      userName: 'veggieQueen',
    },
    ingredients: ['Kikkererwten', 'Kokosmelk', 'Spinazie', 'Ui', 'Currypasta'],
    categories: [
      { id: 3, name: 'Aziatisch' },
      { id: 4, name: 'Vegetarisch' },
      { id: 2, name: 'Hoofdgerecht' },
    ],
    ratingSummary: { average: 4.8, count: 95 },
  },
  {
    id: 3,
    name: 'Caesar Salad',
    description:
      'Een frisse salade met kip, romaine sla en krokante croutons, afgewerkt met een klassieke Caesar dressing.',
    imageUrl:
      'https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad-recipe-1160x1567.jpg',
    time: 15,
    createdBy: {
      id: 3,
      userName: 'saladMaster',
    },
    ingredients: [
      'Romeinse sla',
      'Kip',
      'Parmezaan',
      'Krokante croutons',
      'Caesardressing',
    ],
    categories: [
      { id: 5, name: 'Salade' },
      { id: 6, name: 'Lunch' },
    ],
    ratingSummary: { average: 4.2, count: 67 },
  },
  {
    id: 4,
    name: 'Pancakes',
    description:
      'Luchtige American-style pancakes, heerlijk met boter en ahornsiroop.',
    imageUrl:
      'https://www.leukerecepten.nl/app/uploads/2021/05/american-pancakes.jpg',
    time: 20,
    createdBy: {
      id: 2,
      userName: 'chefMario',
    },
    ingredients: ['Bloem', 'Melk', 'Ei', 'Boter', 'Ahornsiroop'],
    categories: [
      { id: 7, name: 'Ontbijt' },
      { id: 8, name: 'Dessert' },
    ],
    ratingSummary: { average: 4.9, count: 210 },
  },
  {
    id: 5,
    name: 'Chili con Carne',
    description:
      'Een kruidige Mexicaanse stoofpot met bonen en gehakt, ideaal voor koude dagen.',
    imageUrl:
      'https://www.puurgezond.nl/fileadmin/_processed_/c/b/csm_iStock_000008043661XSmall_9ef1768e21.jpg',
    time: 60,
    createdBy: {
      id: 1,
      userName: 'veggieQueen',
    },
    ingredients: [
      'Kidneybonen',
      'Rundergehakt',
      'Paprika',
      'Tomatensaus',
      'Chilipoeder',
    ],
    categories: [
      { id: 9, name: 'Mexicaans' },
      { id: 2, name: 'Hoofdgerecht' },
    ],
    ratingSummary: { average: 4.4, count: 142 },
  },
];

export const RECIPES_DETAIL: RecipeDetail[] = [
  {
    id: 1,
    name: 'Spaghetti Bolognese',
    description:
      'Een klassiek Italiaans gerecht met rijke tomatensaus en rundergehakt. Perfect voor een snelle maar voedzame maaltijd.',
    imageUrl:
      'https://www.flora.com/en-gb/-/media/Project/Upfield/Brands/Flora/Flora-UK-New/Assets/Recipes/Sync-Images/008d0080-e15e-431e-ada0-d962c3cc073b.jpg',
    time: 45,
    createdBy: { id: 2, userName: 'chefMario' },
    ingredients: ['Spaghetti', 'Rundergehakt', 'Tomatensaus', 'Ui', 'Knoflook'],
    ingredientsDetailed: [
      { id: 1, name: 'Spaghetti', amount: 200, unit: 'g' },
      { id: 2, name: 'Rundergehakt', amount: 150, unit: 'g' },
      { id: 3, name: 'Tomatensaus', amount: 200, unit: 'ml' },
      { id: 4, name: 'Ui', amount: 1, unit: 'stuk' },
      { id: 5, name: 'Knoflook', amount: 2, unit: 'teentjes' },
    ],
    categories: [
      { id: 1, name: 'Italiaans' },
      { id: 2, name: 'Hoofdgerecht' },
    ],
    instructions: [
      { id: 1, stepNumber: 1, description: 'Kook de spaghetti beetgaar.' },
      {
        id: 2,
        stepNumber: 2,
        description: 'Bak de ui en knoflook glazig in olijfolie.',
      },
      { id: 3, stepNumber: 3, description: 'Voeg het gehakt toe en bak rul.' },
      {
        id: 4,
        stepNumber: 4,
        description: 'Roer de tomatensaus erdoor en laat 15 minuten sudderen.',
      },
      { id: 5, stepNumber: 5, description: 'Serveer met Parmezaanse kaas.' },
    ],
    ratings: [
      { userId: 1, userName: 'veggieQueen', rating: 5 },
      { userId: 2, userName: 'chefMario', rating: 4 },
      { userId: 3, userName: 'saladMaster', rating: 5 },
      { userId: 4, userName: 'foodieFrank', rating: 5 },
    ],
    ratingSummary: { average: 4.75, count: 4 },
  },
];

export const RECIPE: RecipeDetail = {
  id: 1,
  name: 'Spaghetti Bolognese',
  description:
    'Een klassiek Italiaans gerecht met rijke tomatensaus en rundergehakt. Perfect voor een snelle maar voedzame maaltijd.',
  imageUrl:
    'https://www.flora.com/en-gb/-/media/Project/Upfield/Brands/Flora/Flora-UK-New/Assets/Recipes/Sync-Images/008d0080-e15e-431e-ada0-d962c3cc073b.jpg',
  time: 45,
  createdBy: {
    id: 2,
    userName: 'chefMario',
  },
  ingredients: ['Spaghetti', 'Rundergehakt', 'Tomatensaus', 'Ui', 'Knoflook'],
  ingredientsDetailed: [
    { id: 1, name: 'Spaghetti', amount: 200, unit: 'g' },
    { id: 2, name: 'Rundergehakt', amount: 150, unit: 'g' },
    { id: 3, name: 'Tomatensaus', amount: 200, unit: 'ml' },
    { id: 4, name: 'Ui', amount: 1, unit: 'stuk' },
    { id: 5, name: 'Knoflook', amount: 2, unit: 'teentjes' },
  ],
  categories: [
    { id: 1, name: 'Italiaans' },
    { id: 2, name: 'Hoofdgerecht' },
  ],
  instructions: [
    { id: 1, stepNumber: 1, description: 'Kook de spaghetti beetgaar.' },
    {
      id: 2,
      stepNumber: 2,
      description: 'Bak de ui en knoflook glazig in olijfolie.',
    },
    { id: 3, stepNumber: 3, description: 'Voeg het gehakt toe en bak rul.' },
    {
      id: 4,
      stepNumber: 4,
      description: 'Roer de tomatensaus erdoor en laat 15 minuten sudderen.',
    },
    {
      id: 5,
      stepNumber: 5,
      description: 'Serveer met geraspte Parmezaanse kaas.',
    },
  ],
  ratings: [
    { userId: 1, userName: 'veggieQueen', rating: 5 },
    { userId: 2, userName: 'chefMario', rating: 4 },
    { userId: 3, userName: 'saladMaster', rating: 5 },
    { userId: 4, userName: 'foodieFrank', rating: 5 },
  ],
  ratingSummary: { average: 4.75, count: 4 },
};

export const INGREDIENTS: Ingredient[] = [
  { id: 1, name: 'Spaghetti' },
  { id: 2, name: 'Rundergehakt' },
  { id: 3, name: 'Tomatensaus' },
  { id: 4, name: 'Ui' },
  { id: 5, name: 'Knoflook' },
  { id: 6, name: 'Kikkererwten' },
  { id: 7, name: 'Kokosmelk' },
  { id: 8, name: 'Spinazie' },
  { id: 9, name: 'Currypasta' },
  { id: 10, name: 'Romeinse sla' },
  { id: 11, name: 'Kip' },
  { id: 12, name: 'Parmezaan' },
  { id: 13, name: 'Croutons' },
  { id: 14, name: 'Caesardressing' },
  { id: 15, name: 'Bloem' },
  { id: 16, name: 'Melk' },
  { id: 17, name: 'Ei' },
  { id: 18, name: 'Boter' },
  { id: 19, name: 'Ahornsiroop' },
  { id: 20, name: 'Kidneybonen' },
  { id: 21, name: 'Paprika' },
  { id: 22, name: 'Chilipoeder' },
];
