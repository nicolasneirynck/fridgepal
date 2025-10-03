const RECIPE_DATA = [
  {
    'id': 1,
    'name': 'Spaghetti Bolognese',
    // eslint-disable-next-line @stylistic/max-len
    'imageUrl':'https://www.flora.com/en-gb/-/media/Project/Upfield/Brands/Flora/Flora-UK-New/Assets/Recipes/Sync-Images/008d0080-e15e-431e-ada0-d962c3cc073b.jpg',
    'time': 45,
    'createdBy': {
      'id': 2,
      'userName': 'chefMario',
    },
    'ingredients': ['Spaghetti', 'Rundergehakt', 'Tomatensaus', 'Ui', 'Knoflook'],

  },
  {
    'id': 2,
    'name': 'Vegetarische Curry',
    'imageUrl': 'https://hips.hearstapps.com/hmg-prod/images/chicken-curry-lead-65a1629b408b0.jpg',
    'time': 30,
    'createdBy': {
      'id': 1,
      'userName': 'veggieQueen',
    },
    'ingredients': ['Kikkererwten', 'Kokosmelk', 'Spinazie', 'Ui', 'Currypasta'],
  },
  {
    'id': 3,
    'name': 'Caesar Salad',
    'imageUrl': 'https://cdn.loveandlemons.com/wp-content/uploads/2024/12/caesar-salad-recipe-1160x1567.jpg',
    'time': 15,
    'createdBy': {
      'id': 3,
      'userName': 'saladMaster',
    },
    'ingredients': ['Romeinse sla', 'Kip', 'Parmezaan', 'Krokante croutons', 'Caesardressing'],
  },
  {
    'id': 4,
    'name': 'Pancakes',
    'imageUrl': 'https://www.leukerecepten.nl/app/uploads/2021/05/american-pancakes.jpg',
    'time': 20,
    'createdBy': {
      'id': 2,
      'userName': 'chefMario',
    },
    'ingredients': ['Bloem', 'Melk', 'Ei', 'Boter', 'Ahornsiroop'],

  },
  {
    'id': 5,
    'name': 'Chili con Carne',
    'imageUrl': 'https://www.puurgezond.nl/fileadmin/_processed_/c/b/csm_iStock_000008043661XSmall_9ef1768e21.jpg',
    'time': 60,
    'createdBy': {
      'id': 1,
      'userName': 'veggieQueen',
    },
    'ingredients': ['Kidneybonen', 'Rundergehakt', 'Paprika', 'Tomatensaus', 'Chilipoeder'],

  },
];

const INGREDIENTS_DATA= {
  'ingredients': [
    { 'id': 1, 'name': 'Spaghetti' },
    { 'id': 2, 'name': 'Rundergehakt' },
    { 'id': 3, 'name': 'Tomatensaus' },
    { 'id': 4, 'name': 'Ui' },
    { 'id': 5, 'name': 'Knoflook' },
    { 'id': 6, 'name': 'Kikkererwten' },
    { 'id': 7, 'name': 'Kokosmelk' },
    { 'id': 8, 'name': 'Spinazie' },
    { 'id': 9, 'name': 'Currypasta' },
    { 'id': 10, 'name': 'Romeinse sla' },
    { 'id': 11, 'name': 'Kip' },
    { 'id': 12, 'name': 'Parmezaan' },
    { 'id': 13, 'name': 'Croutons' },
    { 'id': 14, 'name': 'Caesardressing' },
    { 'id': 15, 'name': 'Bloem' },
    { 'id': 16, 'name': 'Melk' },
    { 'id': 17, 'name': 'Ei' },
    { 'id': 18, 'name': 'Boter' },
    { 'id': 19, 'name': 'Ahornsiroop' },
    { 'id': 20, 'name': 'Kidneybonen' },
    { 'id': 21, 'name': 'Paprika' },
    { 'id': 22, 'name': 'Chilipoeder' },
  ],
};

export {RECIPE_DATA, INGREDIENTS_DATA};