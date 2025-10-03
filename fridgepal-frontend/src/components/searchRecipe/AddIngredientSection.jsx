import SearchBar from './SearchBar';
import SelectedIngredients from './SelectedIngredients';

export default function AddIngredientSection({searchText,onChange,ingredients,
  handleAddIngredient,handleDeleteIngredient}) {

  return (
    <section className="ml-4">
      <SearchBar onChange={onChange} searchText={searchText} handleAddIngredient={handleAddIngredient}/>
      <SelectedIngredients ingredients={ingredients} handleDeleteIngredient={handleDeleteIngredient}/>
    </section>
  );
}