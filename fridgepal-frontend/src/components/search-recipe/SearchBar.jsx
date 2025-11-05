export default function SearchBar({
  searchText,
  onChange,
  ingredientSuggestions = [],
  handleSelect,
}) {
  return (
    <div className="relative max-w-xl pt-4 flex">
      <input
        type="text"
        placeholder="Voeg je ingrediënten toe..."
        className="flex-1 bg-[var(--input)] border border-[var(--brand-orange)]
          rounded-lg text-sm p-2 outline-none focus:ring-1 focus:ring-[var(--brand-orange)]"
        value={searchText}
        onChange={onChange}
        data-cy="ingredient-input"
      />
      {/*  <button
          type="button"
          className="bg-[var(--brand-orange)] flex basis-10 shrink-0 h-10 
          justify-center items-center text-white rounded-lg text-2xl ml-2 font-extralight"
          onClick={handleAddIngredient}
        >
          +
        </button> */}

      {searchText.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 
        border-t-0 rounded-b-md shadow-md list-none p-0 m-0 z-50">
          {ingredientSuggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
              data-cy="ingredient-suggestion"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
