import '../index.css';
import IngredientsCard from '../components/recipe/IngredientsCard';
import InstructionsSection from '../components/recipe/InstructionsSection';
import RecipeInformation from '../components/recipe/RecipeInformation';
import { useParams } from 'react-router';

import {RECIPE_DETAIL} from '../api/mock_data';

export default function RecipeDetail(){
  console.log('params:', useParams());

  const { recipeId } = useParams();
  const idAsNumber = Number(recipeId);

  const recipe = RECIPE_DETAIL;

  if (RECIPE_DETAIL.id !== idAsNumber) {
    return (
      <div>
        <h1 className="text-4xl mb-4">Recept niet gevonden</h1>
        <p>Er is geen recept met id {recipeId}.</p>
      </div>
    );
  }

  return(
    <div>
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