import { useState, useMemo} from 'react';
import { useDebounce } from 'use-debounce';
import { getAll } from '../../api';
import useSWR from 'swr';
import SearchBar from '../search-recipe/SearchBar';
import { useFormContext } from 'react-hook-form';

export default function EditIngredients(){

  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 400);

  const { watch,setValue,register ,formState: { errors }, clearErrors} = useFormContext();
  const ingredients = watch('ingredients') || [];

  // auto-suggestie ingredienten (zoekbalk)
  const{data:ingSuggested = []} = useSWR(
    debouncedSearch ? ['ingredients', { search: debouncedSearch }] : null,
    ([url, params]) => getAll(url, params));

  const suggestions = useMemo(
    () => ingSuggested.map((ing) => ({ id: ing.id, name: ing.name.toLowerCase() })),
    [ingSuggested],
  );

  const handleSearch = (e) =>{
    setSearchText(e.target.value);
  };

  const handleSelect = (suggestion) => {
    setSearchText('');
    const updated = [...ingredients, { id: suggestion.id, name: suggestion.name, amount: null, unit: null }]; 
    setValue('ingredients', updated, { shouldValidate: true });
  
    // vanaf een ingredient toegevoegd mogen errors weg
    clearErrors('ingredients');
  };

  // INGREDIENTEN

  function updateIngredient(index, newValue) {
    const updated = ingredients.map((ing, i) => (i === index ? newValue : ing));
    setValue('ingredients', updated, { shouldValidate: true });
  }

  const handleDeleteIngredient = (ing) =>{
    const updated = ingredients.filter((i) => i !== ing);
    setValue('ingredients', updated, { shouldValidate: true });
  };

  return(
    <div className='w-full'>
      <h1 className="text-[var(--brand-gray-dark)] text-xl">Voeg ingrediënten toe</h1>
      <p className="text-[var(--brand-gray-light)] text-sm">Reken telkens voor 4 porties</p>
      <SearchBar
        onChange={handleSearch}
        searchText={searchText}
        ingredientSuggestions={suggestions}
        handleSelect={handleSelect}
      />
      {ingredients.length > 0 &&
      ingredients.map((ing, idx) => (
        <div key={idx} className="flex items-center gap-4 mt-2">
          <span className="w-32 font-medium text-[var(--brand-gray-dark)]">{ing.name}</span>
          <input
            id={`amount-${ing.name}`}
            name={`amount-${ing.name}`}
            value={ing.amount}
            onChange={(e) =>
              updateIngredient(idx, { ...ing, amount: e.target.value })
            }
            className="w-28 bg-white border p-1 rounded"
            placeholder="hoeveelheid..."
          />
          <input
            id={`unit-${ing.name}`}
            name={`unit-${ing.name}`}
            value={ing.unit}
            onChange={(e) =>
              updateIngredient(idx, { ...ing, unit: e.target.value })
            }
            className="w-20 bg-white border p-1 rounded"
            placeholder="gr, liter..."
          />
          <button type="button"
            onClick={() => handleDeleteIngredient(ing)}>x</button>
        </div>
      ))}
      {errors.ingredients && (
        <p className="text-red-500 text-sm mt-2">{errors.ingredients.message}</p>
      )}
      {/* ingredienten registeren en valideren*/}
      <input
        type="hidden"
        {...register('ingredients', {
          validate: (value) =>
            (value && value.length > 0 && value.some((ing) => ing.name?.trim())) ||
      'Voeg minstens één ingrediënt toe',
        })}
      />
    </div>
  );
  
}