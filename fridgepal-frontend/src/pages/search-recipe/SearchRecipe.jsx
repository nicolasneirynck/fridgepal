import '../../index.css';

import IngredientSection from './IngredientSection';
import RecipeCardList from '../../components/RecipeCardList';
import AsyncData from '../../components/AsyncData';
import FilterSection from './FilterSection';

import {useState, useMemo} from 'react';
import useSWR from 'swr';
import { getAll } from '../../api';
import { useDebounce } from 'use-debounce';
import { useCallback } from 'react';

export default function SearchRecipe() {

  // automatische zoekbalk
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 400);
  // ingrediënten om recepten te filteren
  const [ingredients, setIngredients] = useState([]);
  // categorieen om recepten te filteren
  const [selectedCategories, setSelectedCategories] = useState([]);

  // auto-suggestie ingredienten (zoekbalk)
  const{data:ingSuggested = [],
    error: ingredientsError,
    isLoading: ingredientsLoading} = useSWR(
    debouncedSearch ? ['ingredients', { search: debouncedSearch }] : null,
    ([url, params]) => getAll(url, params));

  const suggestions = useMemo(
    () => ingSuggested.map((ing) => ({ id: ing.id, name: ing.name.toLowerCase() })),
    [ingSuggested],
  );

  // useMemo hier gebruiken anders gaat hij {ingredient:.., category:..} object bij elke 
  // render opnieuw maken en schokt het scherm
  const recipeParams = useMemo(() => ({
    ingredient: ingredients.length ? ingredients : undefined,
    category: selectedCategories.length ? selectedCategories : undefined,
  }), [ingredients, selectedCategories]);

  const {
    data: recipes = [],
    isLoading: recipesLoading,
    error: recipesError,
  } = useSWR(
    ['recipes', 
      JSON.stringify(recipeParams)],
    ([url, params]) => getAll(url, JSON.parse(params)),
  );

  const handleSearch = (e) =>{
    setSearchText(e.target.value);
  };

  const handleSelect = (suggestion) => {
    handleAddIngredient(suggestion.name); // TODO nog nodig of rechtstreeks fixen? 
    
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

  const countMatchingIngredients = useCallback(
    (recipeIngredients) => {
      recipeIngredients = recipeIngredients.map((ing) => ing.toLowerCase().trim());

      return ingredients.reduce((count, ing) => (
        recipeIngredients.includes(ing) ? count + 1 : count
      ), 0);
    },[ingredients]);
  
  // const sortedRecipes = useMemo(() => {
   
  //   const sorted = [...recipes].sort((r1, r2) => {
  //     const a = countMatchingIngredients(r1.ingredients);
  //     const b = countMatchingIngredients(r2.ingredients);
  //     return b - a;
  //   });

  //   return sorted;
    
  // }, [ingredients,recipes]);

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

      {ingredientsError && (
        <div
          data-cy="axios_error_message"
          className="text-red-600 bg-red-100 border border-red-300 p-2 mt-2 rounded"
        >
          Er ging iets mis bij het zoeken naar ingrediënten.
        </div>
      )}
      
      <FilterSection onFilterChange={setSelectedCategories} />

      <AsyncData loading={recipesLoading} error={recipesError}>
        {!recipesError
          ?(<RecipeCardList 
            recipes={recipes} 
            countMatchingIngredients={countMatchingIngredients}/>)
          :null}
      </AsyncData>
    </div>
  );
}