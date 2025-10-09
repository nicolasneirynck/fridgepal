import {useState} from 'react';
import StepsBar from '../../components/add-recipe/StepsBar';

export default function AddRecipe(){

  const [currentStep, setCurrentStep] = useState(1);

  return(
    <main className="flex justify-center">
      <StepsBar/>
    </main>
  );
}