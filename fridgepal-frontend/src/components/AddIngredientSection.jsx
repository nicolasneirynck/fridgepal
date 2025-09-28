import SearchBar from './SearchBar';
import IngredientButton from './IngredientButton';

export default function AddIngredientSection(){
  return(
    <section className='mr-2'>
      <SearchBar />
      <p className="text-gray-500 text-sm font-medium mt-3 mb-2">Your ingredients:</p>
      <div className="flex gap-2">
        <IngredientButton name="wortel"/>
        <IngredientButton name="paprika"/>
      </div>
    </section>
  );
}