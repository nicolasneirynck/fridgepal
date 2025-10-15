import '../../index.css';

import IngredientSection from './IngredientSection';
import RecipeCardList from './RecipeCardList';
import AsyncData from '../../components/AsyncData';

import {useState, useMemo} from 'react';
import useSWR from 'swr';
import { getAll } from '../../api';

export default function SearchRecipe() {

  const [searchText, setSearchText] = useState('');
  const [ingredientSuggestions, setingredientSuggestions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const{data:allIngredients = []} = useSWR('ingredients', getAll);
  const suggestions = useMemo(
    () => allIngredients.map((ing) => ing.name.toLowerCase()),
    [allIngredients],
  );

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useSWR('recipes', getAll);

  const handleSearch = (e) =>{
    setSearchText(e.target.value);

    const filteredSuggestions = suggestions
      .filter((ing) => ing.includes(e.target.value))
      .slice(0,8);

    setingredientSuggestions(filteredSuggestions);
  };

  const handleSelect = (suggestion) => {
    handleAddIngredient(suggestion); // TODO nog nodig of rechtstreeks fixen? 
  };

  const handleAddIngredient = (ingredientName) => {
    // const name = ingredientName.trim() || searchText.trim(); 
    // if (!name) return;
    
    //  if(!ingredients.includes(name.toLowerCase()))
    setIngredients([...ingredients, ingredientName]); // TODO is dit nog nodig?
    
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
  
  const sortedRecipes = useMemo(() => {
   
    const sorted = [...recipes].sort((r1, r2) => {
      const a = countMatchingIngredients(r1.ingredients);
      const b = countMatchingIngredients(r2.ingredients);
      return b - a;
    });

    return sorted;
    
  }, [ingredients,recipes]);

  return (
    <div>
      <IngredientSection 
        onChange={handleSearch} 
        searchText={searchText}
        ingredients={ingredients}
        handleAddIngredient={handleAddIngredient}
        handleDeleteIngredient={handleDeleteIngredient}
        ingredientSuggestions={ingredientSuggestions}
        handleSelect={handleSelect}/>
      {/*<FilterSection />*/}
      <AsyncData loading={isLoading} error={error}>
        {!error
          ?(<RecipeCardList 
            recipes={sortedRecipes} 
            countMatchingIngredients={countMatchingIngredients}/>)
          :null}
        
      </AsyncData>
    </div>
  );
}