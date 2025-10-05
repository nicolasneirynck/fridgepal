import SearchBar from './SearchBar';
import SelectedIngredients from './SelectedIngredients';

export default function IngredientSection({searchText,onChange,ingredients,
  handleAddIngredient,handleDeleteIngredient,filteredSuggestions, handleSelect}) {

  return (
    <section className="ml-4">
      <SearchBar 
        onChange={onChange} 
        searchText={searchText} 
        handleAddIngredient={handleAddIngredient}
        filteredSuggestions={filteredSuggestions}
        handleSelect={handleSelect}/>
      <SelectedIngredients ingredients={ingredients} handleDeleteIngredient={handleDeleteIngredient}/>
    </section>
  );
}