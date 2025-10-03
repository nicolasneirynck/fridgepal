import { INGREDIENTS_DATA } from '../../api/mock_data';

export default function SearchBar({searchText,onChange,handleAddIngredient}){

  {/*  const ingredients = INGREDIENTS_DATA.ingredients.map((ing) => ing.name);*/}
  return(
    <form className="flex max-w-xl pt-4">
      <input
        type="text"
        placeholder="Add ingredients you have..."
        className="flex-1 bg-[var(--input)] border rounded-lg border-gray-300 text-sm p-2"
        value={searchText}
        onChange={onChange}
      />
      <button 
        type='button'
        className="bg-[var(--brand-orange)] flex basis-10 shrink-0 h-10 
        justify-center items-center text-white rounded-lg text-2xl ml-2 
          font-extralight"
        onClick={handleAddIngredient}>
        +
      </button>
    </form>
  );
}