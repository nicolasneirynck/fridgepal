import SearchBar from './SearchBar';
import SelectedIngredients from './SelectedIngredients';

export default function AddIngredientSection() {
  const ingredients = ['wortel', 'paprika']; // later dynamisch

  return (
    <section className="ml-4">
      <SearchBar />
      <SelectedIngredients ingredients={ingredients} />
    </section>
  );
}