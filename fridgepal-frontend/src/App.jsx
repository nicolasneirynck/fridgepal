import './index.css';

import Header from './components/Header';
import AddIngredientSection from './components/searchRecipe/AddIngredientSection';
import RecipeCardList from './components/searchRecipe/RecipeCardList';
import {useState} from 'react';

import {INGREDIENTS_DATA, RECIPE_DATA} from './api/mock_data';

function App() {

  const [searchText, setSearchText] = useState('');
  const [ingredients, setIngredients] = useState(['Tomaat', 'Paprika']);
  
  const handleSearch = (e) =>{
    setSearchText(e.target.value);
    console.log(searchText);
  };

  const handleAddIngredient = () =>{
    if (!searchText.trim()) return;
    const newIngredientsList = [...ingredients, searchText];
    setIngredients(newIngredientsList);
    setSearchText('');
  };

  const handleDeleteIngredient = (ing) =>{
    const newIngredientsList = ingredients.filter((ingredient) => ingredient != ing);
    setIngredients(newIngredientsList);
  };

  return (
    <div>
      <Header />
      <AddIngredientSection 
        onChange={handleSearch} 
        searchText={searchText}
        ingredients={ingredients}
        handleAddIngredient={handleAddIngredient}
        handleDeleteIngredient={handleDeleteIngredient}/>
      {/*<FilterSection />*/}
      <RecipeCardList recipes={RECIPE_DATA}/>
    </div>
  );
}

export default App;
