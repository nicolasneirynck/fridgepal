import '../../index.css';
import IngredientsCard from '../../components/recipe-detail/IngredientsCard';
import InstructionsSection from '../../components/recipe-detail/InstructionsSection';
import RecipeInformation from '../../components/recipe-detail/RecipeInformation';
import { useParams } from 'react-router';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';

import { getById } from '../../api';

export default function RecipeDetail(){

  const { recipeId } = useParams();
  const idAsNumber = Number(recipeId);

  const {
    data: recipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useSWR(idAsNumber ? `recipes/${idAsNumber}` : null, getById);

  if (!recipe) {
    return (
      <div>
        <h1>Plaats niet gevonden</h1>
        <p>Er is geen recept met id {idAsNumber}.</p>
      </div>
    );
  }

  return(
    <div>
      <AsyncData loading={recipeLoading} error={recipeError}>
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
      </AsyncData>
    </div>
  );
}