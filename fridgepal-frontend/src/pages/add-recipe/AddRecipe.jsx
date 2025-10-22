import {useState,useEffect} from 'react';
import StepsBar from '../../components/add-recipe/StepsBar';
import EditDetails from '../../components/add-recipe/EditDetails';
import EditIngredients from '../../components/add-recipe/EditIngredients';
import EditInstructions from '../../components/add-recipe/EditInstructions';

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

//   imageUrl: string | null;
//   time: number;
//   createdBy: {
//     id: number;
//   };
//   ingredients: {
//     id: number;
//     name: string;
//     amount: number;
//     unit: string;
//   }[];
//   instructions: {
//     stepNumber: number;
//     description: string;
//   }[];
//   categories: {
//     id: number;
//     name: string;
//   }[];
// }

export default function AddRecipe(){

  // centrale useForm zodat hij die op alle pagina's kan bijhouden
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = (values) => {
    console.log(JSON.stringify(values));
    // Nieuwe transactie moet nog worden opgeslagen
    reset(); 
  };

  // zorgen dat bij verlaten en terugkomen naar deze pagina hij currentstep opnieuw op 1 zet
  useEffect(() => {
    setCurrentStep(1);
  },[]);

  return(
    <main className="flex flex-col items-center gap-5">
      <StepsBar currentStep={currentStep}/>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-full">
        
          <div className="bg-[var(--brand-light)] w-2/3 border border-[#e5e7eb] rounded-xl p-6">
            {currentStep==1 && <EditDetails/>}
            {currentStep==2 && <EditIngredients/>}
            {currentStep==3 && <EditInstructions/>}
          </div>
        
          <div className="flex gap-4 mt-6 justify-center">
            {currentStep > 1 && <button type="button" 
              className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
              onClick={() => setCurrentStep(currentStep-1)}>Vorige Stap</button>}
            {currentStep < 3 && <button type="button" 
              className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
              onClick={() => setCurrentStep(currentStep+1)}>Volgende Stap</button>
            }
            {currentStep == 3 && <button type="submit" 
              className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
            >Opslaan</button>
            }
          </div>
        </form>
      </FormProvider>
    </main>
  );
}