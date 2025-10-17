import '../../index.css';

import IngredientSection from './IngredientSection';
import RecipeCardList from './RecipeCardList';
import AsyncData from '../../components/AsyncData';

import {useState, useMemo} from 'react';
import useSWR from 'swr';
import { getAll } from '../../api';
import { useDebounce } from 'use-debounce';

export default function SearchRecipe() {

  // automatische zoekbalk
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 400);
  // ingrediënten om recepten te filteren
  const [ingredients, setIngredients] = useState([]);

  // auto-suggestie ingredienten (zoekbalk)
  const{data:ingSuggested = []} = useSWR(
    debouncedSearch ? ['ingredients', { search: debouncedSearch }] : null,
    ([url, params]) => getAll(url, params));

  const suggestions = useMemo(
    () => ingSuggested.map((ing) => ing.name.toLowerCase()),
    [ingSuggested],
  );

  const {
    data: recipes = [],
    isLoading,
    error,
  } = useSWR('recipes', getAll);

  const handleSearch = (e) =>{
    setSearchText(e.target.value);
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
        ingredientSuggestions={suggestions}
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