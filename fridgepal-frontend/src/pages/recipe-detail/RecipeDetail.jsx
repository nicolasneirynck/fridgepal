import '../../index.css';
import IngredientsCard from '../../components/recipe-detail/IngredientsCard';
import InstructionsSection from './InstructionsSection';
import RecipeInformation from './RecipeInformation';
import { useParams } from 'react-router';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
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
        await deleteById('recipes',{arg:id});
        navigate('/search');
      } catch (error) {
        console.error('Verwijderen mislukt:', error);
      }
    }
  }

  return(
    <AsyncData loading={recipeLoading} error={recipeError}>
      {/* pagina centreren + breedte beperken (max-w-6xl) */}
      <div className='flex flex-col items-center min-h-screen'>
        <div className='w-full max-w-6xl px-4'>
          {/* bovenste blok: 2x flex-1 = elk kind krijgt evenveel ruimte*/}
          <div className="flex flex-col lg:flex-row gap-20 mt-10">
            <div className="flex-1">
              <img 
                src={recipe.imageUrl} 
                // w-full + object cover = elke img evenveel breedte innemen
                className='rounded-2xl w-full object-cover max-h-96'/> 
            </div>
            <div className="flex-1">
              <RecipeInformation 
                recipe={recipe}
                onDelete={handleDelete}/>
            </div>
          </div>
          {/* onderste blok */}
          <div className='flex flex-col md:flex-row gap-6 mt-10'>
            <div className="md:basis-1/3">
              <IngredientsCard ingredients={recipe.ingredients}/>
            </div>
            <div className="md:basis-2/3">
              <InstructionsSection instructions={recipe.instructions}/>
            </div>
          </div>
        </div>
      </div>

    </AsyncData>

  );
}