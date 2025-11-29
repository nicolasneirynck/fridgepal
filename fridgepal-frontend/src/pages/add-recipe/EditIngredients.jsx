import { useState, useMemo} from 'react';
import { useDebounce } from 'use-debounce';
import { getAll } from '../../api';
import useSWR from 'swr';
import SearchBar from '../../components/SearchBar';
import { useFormContext,useFieldArray } from 'react-hook-form';

export default function EditIngredients(){

  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 400);

  // const { watch,setValue,register ,formState: { errors }, clearErrors} = useFormContext();
  // const ingredients = watch('ingredients') || [];
  const { control, register,clearErrors, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

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
    append({ id: suggestion.id, name: suggestion.name, amount: '', unit: '' });
    clearErrors('ingredients');
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
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-4 mt-2">
          <span className="w-32 font-medium text-[var(--brand-gray-dark)]">
            {field.name}
          </span>
          <input
            {...register(`ingredients.${index}.amount`, {
              validate: (value) =>
                value === '' || value === null || Number(value) > 0 || 'Hoeveelheid moet groter dan 0 zijn',
            })}
            className="w-28 bg-white border p-1 rounded"
            type='number'
            placeholder="hoeveelheid..."
            data-cy={`amount${index}-input`}
          />
          <input
            {...register(`ingredients.${index}.unit`)}
            className="w-20 bg-white border p-1 rounded"
            placeholder="gr, liter..."
            data-cy={`unit${index}-input`}
          />
          <button type="button" onClick={() => remove(index)}>x</button>
          {errors.ingredients?.[index]?.amount && (
            <p className="text-red-500 text-sm"
              data-cy={`amount${index}_error`}>
              {errors.ingredients[index].amount.message}
            </p>
          )}
        </div>
        
      ))}
      {errors.ingredients && (
        <p className="text-red-500 text-sm mt-2"
          data-cy="ingredients_error">{errors.ingredients.message}</p>
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