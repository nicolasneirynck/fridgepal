import {useState,useEffect} from 'react';
import StepsBar from '../../components/add-recipe/StepsBar';
import EditDetails from '../../components/add-recipe/EditDetails';
import EditIngredients from '../../components/add-recipe/EditIngredients';
import EditInstructions from '../../components/add-recipe/EditInstructions';
import { save, getById } from '../../api';
import { useNavigate, useParams } from 'react-router';
import AsyncData from '../../components/AsyncData';
import useSWR from 'swr';
import { useForm,FormProvider } from 'react-hook-form';

export default function AddOrEditRecipe(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    data: recipe,
    error: recipeError,
    isLoading: recipeLoading,
  } = useSWR(id ? `recipes/${id}` : null, getById);
  
  // centrale useForm zodat hij die op alle pagina's kan bijhouden
  // stabiele lege default waardes, anders soms miserie met undefined.map()..
  const methods = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      recipeId: null,
      description: '',
      imageUrl: '',
      time: '',
      categories: [],
      ingredients: [],
      instructions: [{ stepNumber: 1, description: '' }],
    },
  });

  const { reset,formState:{isSubmitting},handleSubmit,trigger} = methods;

  useEffect(() => {
    if (recipe) {
      reset({
        name: recipe.name ?? '',
        recipeId: recipe.recipeId ?? null,
        description: recipe.description ?? '',
        imageUrl: recipe.imageUrl ?? '',
        time: recipe.time ?? '',
        categories: recipe.categories?.map((c) => c.id) ?? [],
        ingredients: recipe.ingredients ?? [],
        instructions: recipe.instructions?.length
          ? recipe.instructions
          : [{ stepNumber: 1, description: '' }],
      });
    }
  }, [recipe, reset]); // zodra eventueel recept is binnengehaald api -> reset van formvormulieren met die waardes

  const onSubmit = async (values) => {
    // conversie van gevalideerde gegevens
    const body = {
      name: values.name,
      description: values.description || null,
      imageUrl: values.imageUrl || null,
      time: parseInt(values.time),
      createdBy: { id: 1 },

      ingredients: values.ingredients.map((i) => ({
        id: i.id,
        name: i.name,
        amount: i.amount ? parseInt(i.amount) : null,
        unit: i.unit || null,
      })),

      instructions: values.instructions.map((s, index) => ({
        stepNumber: index + 1,
        description: s.description.trim(),
      })),

      categories: values.categories.map(Number),
    };

    try{
      await save(
        'recipes',{arg:body},
      );
      reset(); 
      navigate('/search');  
    } catch (error) {
      alert('Opslaan mislukt'); // TODO miss UI vriendelijkere manier om te doen? 
      console.log('Foutstatus:', error.response?.status);
      console.log('Foutmelding:', error.response?.data);
    }
  };

  async function handleNextStep() {
    let isValid = true;

    if (currentStep === 1) {
      //details
      isValid = await trigger(['name', 'description', 'time', 'categories']);
    } else if (currentStep === 2) {
      //ingredienten
      isValid = await trigger(['ingredients']);
      const ingredients = methods.getValues('ingredients') ?? [];

      const hasIngredients = ingredients.length > 0;

      if (!hasIngredients) {
        methods.setError('ingredients', {
          type: 'manual',
          message: 'Voeg minstens één ingrediënt toe',
        });
        isValid = false;
      }
      
    } else if (currentStep === 3) {
      isValid = await trigger(['instructions']);
      const instructions = methods.getValues('instructions') ?? [];
      const hasValidStep = instructions.some(
        (step) => step.description && step.description.trim() !== '',
      );
      if (!hasValidStep) {
        methods.setError('instructions', {
          type: 'manual',
          message: 'Voeg minstens één stap toe',
        });
        isValid = false;
      }
    }

    if (isValid) setCurrentStep(currentStep + 1);
  }

  //TODO niet de bedoeling van useEffect, andere oplossing?
  // zorgen dat bij verlaten en terugkomen naar deze pagina hij currentstep opnieuw op 1 zet
  useEffect(() => {
    setCurrentStep(1);
  },[]);

  return(
    <main className="flex flex-col items-center gap-5">
      <StepsBar currentStep={currentStep}/>
      <AsyncData error={recipeError} loading={recipeLoading}>
        {/* Formprovider zorgt dat de subcomponenten kunnen praten met gedeelde formstate */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center w-full">
        
            <div className="bg-[var(--brand-light)] w-2/3 border border-[#e5e7eb] rounded-xl p-6">
              {currentStep==1 ? <EditDetails recipe={recipe}/> 
                :currentStep==2 ? <EditIngredients recipe={recipe}/> 
                  :currentStep==3 && <EditInstructions recipe={recipe}/>}
            </div>
        
            <div className="flex gap-4 mt-6 justify-center">
              {currentStep > 1 && <button type="button" 
                className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
                onClick={() => setCurrentStep(currentStep-1)}>Vorige Stap</button>}
              {currentStep < 3 && <button type="button" 
                className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
                onClick={handleNextStep}
                data-cy="next-step">
                Volgende Stap
              </button>
              }
              {currentStep == 3 && <button disabled={isSubmitting} type="submit" 
                className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
                data-cy="submit_recipe"
              >{recipe?.id?'Opslaan':'Toevoegen'}</button>
              }
            </div>
          </form>
        </FormProvider>
      </AsyncData>
    </main>
  );
}