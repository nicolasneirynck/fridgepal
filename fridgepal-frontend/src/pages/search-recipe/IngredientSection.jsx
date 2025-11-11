import SearchBar from '../../components/search-recipe/SearchBar';
import SelectedIngredients from '../../components/search-recipe/SelectedIngredients';
import AsyncData from '../../components/AsyncData';

export default function IngredientSection({searchText,onChange,ingredients,handleDeleteIngredient,
  ingredientSuggestions, handleSelect}) {

  return (
    <section className="ml-4">
      <SearchBar
        onChange={onChange}
        searchText={searchText}
        ingredientSuggestions={ingredientSuggestions}
        handleSelect={handleSelect}
      />
      <SelectedIngredients ingredients={ingredients} handleDeleteIngredient={handleDeleteIngredient}/>
    </section>
  );
}