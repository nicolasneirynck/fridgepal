import {useState,useEffect} from 'react';
import StepsBar from '../../components/add-recipe/StepsBar';
import EditDetails from '../../components/add-recipe/EditDetails';
import EditIngredients from '../../components/add-recipe/EditIngredients';
import EditInstructions from '../../components/add-recipe/EditInstructions';
import useSWRMutation from 'swr/mutation'; 
import { save, getById } from '../../api';
import { useNavigate, useParams } from 'react-router';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';

import { useForm,FormProvider } from 'react-hook-form';

const EMPTY_RECIPE = {
  name: undefined,
  description: undefined,
  imageUrl: undefined,
  time: undefined,
  createdBy: {
    id: '1',
  },
  ingredients: [], // id nummers
  instructions:[],
  categories: [],
};

export default function AddRecipe(){
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: recipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useSWR(id ? `recipes/${id}` : null, getById);

  const [currentStep, setCurrentStep] = useState(1);
  
  // centrale useForm zodat hij die op alle pagina's kan bijhouden
  const methods = useForm({
    mode:'onBlur',
    defaultValues: {
      name: recipe?.name,
      recipeId: recipe?.recipeId,
      description: recipe?.description,
      imageUrl: recipe?.imageUrl,
      time: recipe?.time,
      categories: recipe?.categories?.map((c) => c.id) ?? [], // enkel id nodig
      ingredients: recipe?.ingredients,
      instructions: recipe?.instructions,
    },
  });

  const { trigger: saveRecipe, error: saveError } = useSWRMutation(
    'recipes',
    save,
  );

  const { handleSubmit, reset,trigger} = methods;

  async function handleNextStep() {
    let isValid = true;

    if (currentStep === 1) {
      isValid = await trigger(['name', 'description', 'time', 'categories']);
    } else if (currentStep === 2) {
      isValid = await trigger(['ingredients']);

      const ingredients = methods.getValues('ingredients');
      if (!ingredients || ingredients.length === 0) {
        methods.setError('ingredients', {
          type: 'manual',
          message: 'Voeg minstens één ingrediënt toe',
        });
        isValid = false;
      }
    }

    if (isValid) setCurrentStep(currentStep + 1);
  }

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values));

    // validatie gebeurt elders

    await saveRecipe(
      
      {...values, // TODO niet dringend maar description mag in backend ook null zijn
        imageUrl:values.imageUrl? values.imageUrl : null,
        createdBy:{id:1},
      }
      , {
        throwOnError: false,
        onSuccess: () => navigate('/search'),
      });      
    reset(); 
  };

  // zorgen dat bij verlaten en terugkomen naar deze pagina hij currentstep opnieuw op 1 zet
  useEffect(() => {
    setCurrentStep(1);
  },[]);

  return(
    <main className="flex flex-col items-center gap-5">
      <StepsBar currentStep={currentStep}/>
      <AsyncData error={saveError || recipeError} loading={recipeLoading}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full">
        
            <div className="bg-[var(--brand-light)] w-2/3 border border-[#e5e7eb] rounded-xl p-6">
              {currentStep==1 && <EditDetails recipe={recipe}/>}
              {currentStep==2 && <EditIngredients recipe={recipe}/>}
              {currentStep==3 && <EditInstructions recipe={recipe}/>}
            </div>
        
            <div className="flex gap-4 mt-6 justify-center">
              {currentStep > 1 && <button type="button" 
                className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
                onClick={() => setCurrentStep(currentStep-1)}>Vorige Stap</button>}
              {currentStep < 3 && <button type="button" 
                className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
                onClick={handleNextStep}>Volgende Stap</button>
              }
              {currentStep == 3 && <button type="submit" 
                className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
              >{recipe?.id?'Opslaan':'Toevoegen'}</button>
              }
            </div>
          </form>
        </FormProvider>
      </AsyncData>
    </main>
  );
}