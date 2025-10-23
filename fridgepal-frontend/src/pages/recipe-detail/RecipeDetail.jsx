import '../../index.css';
import IngredientsCard from '../../components/recipe-detail/IngredientsCard';
import InstructionsSection from '../../components/recipe-detail/InstructionsSection';
import RecipeInformation from '../../components/recipe-detail/RecipeInformation';
import { useParams } from 'react-router';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
import useSWRMutation from 'swr/mutation'; 
import { useNavigate } from 'react-router';

import { getById, deleteById } from '../../api';

export default function RecipeDetail(){

  const navigate = useNavigate();

  const { recipeId } = useParams();
  const idAsNumber = Number(recipeId);
  const {
    data: recipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useSWR(idAsNumber ? `recipes/${idAsNumber}` : null, getById);

  const { trigger: deleteRecipe, error: deleteError } = useSWRMutation('recipes', deleteById);

  if (!recipe) {
    return (
      <div>
        <h1>Plaats niet gevonden</h1>
        <p>Er is geen recept met id {idAsNumber}.</p>
      </div>
    );
  }

  async function handleDelete(id) {
    if (window.confirm('Zeker dat je dit recept wilt verwijderen?')) {
      try {
        await deleteRecipe(id);
        navigate('/search');
      } catch (error) {
        console.error('Verwijderen mislukt:', error);
      }
    }
  }

  return(
    <div>
      <AsyncData loading={recipeLoading} error={recipeError || deleteError}>
        <div className='mt-7 ml-4 flex gap-8 flex-col lg:flex-row'>
          <div className='max-w-150'>
            <img 
              src={recipe.imageUrl} 
              className='object-cover rounded-2xl'/>
          </div>
          <RecipeInformation 
            recipe={recipe}
            onDelete={handleDelete}/>
            
        </div>

        <div className='mt-5 ml-4 flex-col md:flex-row flex gap-6'>
          <IngredientsCard ingredients={recipe.ingredients}/>
          <InstructionsSection instructions={recipe.instructions}/>
        </div>
      </AsyncData>
    </div>
  );
}