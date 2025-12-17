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

  // zoektext + vertragen
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 400);

  const [ingredients, setIngredients] = useState([]);
  
  const [selectedCategories, setSelectedCategories] = useState([]);

  // ingredientobjectjes ophalen
  const{data:ingSuggested = [],
    error: ingredientsError,
  } = useSWR(
    debouncedSearch ? ['ingredients', { search: debouncedSearch }] : null,
    ([url, params]) => getAll(url, params));

  // autosuggestie vullen met lowcase naam, enkel veranderen bij nieuwe suggestie
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
    handleAddIngredient(suggestion.name);
  };

  const handleAddIngredient = (ingredientName) => { // TODO nu enkel select -> uitbreiden met keys
    setIngredients([...ingredients, ingredientName]);
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

  return (
    <div>
      <IngredientSection 
        onChange={handleSearch} 
        searchText={searchText}
        ingredients={ingredients}
        //handleAddIngredient={handleAddIngredient} -> eventueel later als keys gebruikt?
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