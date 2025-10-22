import { useState, useMemo} from 'react';
import { useDebounce } from 'use-debounce';
import { getAll } from '../../api';
import useSWR from 'swr';
import SearchBar from '../search-recipe/SearchBar';

export default function EditIngredients(){

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

  const handleSearch = (e) =>{
    setSearchText(e.target.value);
  };

  const handleSelect = (suggestion) => {
    setSearchText('');
    setIngredients((prev) => [...prev, { name: suggestion, amount: '', unit: '' }]);

  };

  function updateIngredient(index, newValue) {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? newValue : ing)),
    );
  }

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

  return(
    <div>
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
    </div>
  );
  
}