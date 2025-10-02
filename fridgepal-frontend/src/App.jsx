import './index.css';

import Header from './components/Header';
import AddIngredientSection from './components/searchRecipe/AddIngredientSection';
import RecipeCardList from './components/searchRecipe/RecipeCardList';

import RECIPE_DATA from './api/mock_data';

function App() {
  return (
    <div>
      <Header />
      <AddIngredientSection />
      {/*<FilterSection />*/}
      <RecipeCardList recipes={RECIPE_DATA} />
    </div>
  );
}

export default App;
