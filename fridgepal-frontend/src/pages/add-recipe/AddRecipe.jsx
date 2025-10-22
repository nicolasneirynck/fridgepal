import {useState} from 'react';
import StepsBar from '../../components/add-recipe/StepsBar';
import EditDetails from '../../components/add-recipe/EditDetails';
import EditIngredients from '../../components/add-recipe/EditIngredients';
import EditInstructions from '../../components/add-recipe/EditInstructions';

export default function AddRecipe(){

  const [currentStep, setCurrentStep] = useState(1);

  return(
    <main className="flex flex-col items-center gap-5">
      <StepsBar currentStep={currentStep}/>
      <form className='bg-[var(--brand-light)] w-2/3 border-[#e5e7eb] border rounded-xl p-5'>
        {currentStep==1 && <EditDetails/>}
        {currentStep==2 && <EditIngredients/>}
        {currentStep==3 && <EditInstructions/>}
      </form>
      <div className='flex gap-2'>
        {currentStep > 1 && <button type="button" 
          className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
          onClick={() => setCurrentStep(currentStep-1)}>Vorige Stap</button>}
        {currentStep < 3 && <button type="button" 
          className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
          onClick={() => setCurrentStep(currentStep+1)}>Volgende Stap</button>
        }
        {currentStep == 3 && <button type="button" 
          className="bg-[var(--brand-dark)] rounded-xl px-10 py-3 text-white font-medium hover:cursor-pointer"
        >Opslaan</button>
        }
      </div>
    </main>
  );
}