import './index.css';
import Header from './components/Header';
import IngredientsCard from './components/recipe/IngredientsCard';
import InstructionsSection from './components/recipe/InstructionsSection';
import RecipeInformation from './components/recipe/RecipeInformation';

import {RECIPE_DETAIL} from './api/mock_data';

export default function Recipe(){
  
  const recipe = RECIPE_DETAIL;

  return(
    <div>
      <Header />
      <div className='mt-7 ml-4 flex gap-8 flex-col lg:flex-row'>
        <div className='max-w-150'>
          <img 
            src={recipe.imageUrl} 
            className='object-cover rounded-2xl'/>
        </div>
        <RecipeInformation 
          recipe={recipe}/>
      </div>

      <div className='mt-5 ml-4 flex-col md:flex-row flex gap-6'>
        <IngredientsCard ingredients={recipe.ingredients}/>
        <InstructionsSection instructions={recipe.instructions}/>
      </div>
    </div>
  );
}