import './index.css';

import Header from './components/Header';
import FilterSection from './components/FilterSection';
import AddIngredientSection from './components/AddIngredientSection';

import RecipeCard from './components/RecipeCard';

function App() {

  return (
    <div className='ml-4'>
      <Header/>
      <AddIngredientSection />
      <FilterSection />
      <div className="grid gap-6 p-6 [grid-template-columns:repeat(auto-fit,minmax(250px,250px))]">
        <RecipeCard />
        <RecipeCard />
      </div>
    </div>
  );
}

export default App;
