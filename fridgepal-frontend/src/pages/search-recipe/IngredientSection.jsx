import SearchBar from '../../components/search-recipe/SearchBar';
import SelectedIngredients from '../../components/search-recipe/SelectedIngredients';

export default function IngredientSection({searchText,onChange,ingredients,handleDeleteIngredient,
  filteredSuggestions, handleSelect}) {

  return (
    <section className="ml-4">
      <SearchBar
        onChange={onChange}
        searchText={searchText}
        filteredSuggestions={filteredSuggestions}
        handleSelect={handleSelect}
      />
      <SelectedIngredients ingredients={ingredients} handleDeleteIngredient={handleDeleteIngredient}/>
    </section>
  );
}