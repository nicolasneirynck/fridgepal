import '../index.css';

import IngredientSection from '../components/searchRecipe/IngredientSection';
import RecipeCardList from '../components/searchRecipe/RecipeCardList';
import {useState,useEffect} from 'react';

import {INGREDIENTS_DATA, RECIPE_DATA} from '../api/mock_data';

export default function SearchRecipe() {

  const [searchText, setSearchText] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState(RECIPE_DATA);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  
  const suggestions = INGREDIENTS_DATA.ingredients.map((ing) => ing.name);

  const handleSearch = (e) =>{
    setSearchText(e.target.value);

    const filteredSuggestions = suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredSuggestions(filteredSuggestions);
  };

  const handleSelect = (suggestion) => {
    handleAddIngredient(suggestion);
  };

  const handleAddIngredient = (ingredientName) => {
    const name = ingredientName.trim() || searchText.trim();
    if (!name) return;

    setIngredients([...ingredients, name.toLowerCase()]);
    setSearchText('');
  };

  const handleDeleteIngredient = (ing) =>{
    const newIngredientsList = ingredients.filter((ingredient) => ingredient != ing);
    setIngredients(newIngredientsList);
  };

  const countMatchingIngredients = (recipeIngredients) => {
    recipeIngredients = recipeIngredients.map((ing) => ing.toLowerCase().trim());

    return ingredients.reduce((count, ing) => (
      recipeIngredients.includes(ing) ? count + 1 : count
    ), 0);
  }; 

  useEffect(() => {
    if (ingredients.length === 0) {
      setRecipes([...RECIPE_DATA]);
      return;
    }

    const sorted = [...recipes].sort((r1, r2) => {
      const a = countMatchingIngredients(r1.ingredients);
      const b = countMatchingIngredients(r2.ingredients);
      return b - a;
    });

    setRecipes(sorted);
  }, [ingredients]);

  return (
    <div>
      <IngredientSection 
        onChange={handleSearch} 
        searchText={searchText}
        ingredients={ingredients}
        handleAddIngredient={handleAddIngredient}
        handleDeleteIngredient={handleDeleteIngredient}
        filteredSuggestions={filteredSuggestions}
        handleSelect={handleSelect}/>
      {/*<FilterSection />*/}
      <RecipeCardList 
        recipes={recipes} 
        countMatchingIngredients={countMatchingIngredients}/>
    </div>
  );
}