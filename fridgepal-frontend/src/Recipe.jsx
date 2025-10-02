import './index.css';
import Header from './components/Header';
import IngredientsCard from './components/recipe/IngredientsCard';
import InstructionsSection from './components/recipe/InstructionsSection';
import { ChefHat} from 'lucide-react';
import Rating from '@mui/material/Rating';

export default function Recipe(){
  return(
    <div>
      <Header />
      <div className='mt-7 flex gap-8 flex-col lg:flex-row'>
        <img 
          src="/public/recipe.jpg" 
          className='w-125 h-100 object-cover rounded-2xl'/>
        
        <div className='basis-100'>
          <h2 className='mb-3 text-3xl text-[var(--brand-gray-dark)] font-bold'>Pasta norma</h2>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-[var(--brand-orange)]/10 rounded-full
                          flex justify-center items-center'>
              <ChefHat className="h-4 w-4 text-[var(--brand-orange)]" />
            </div>
            <span className='text-sm text-[var(--brand-gray-light)]'>by Nicolas Neirynck</span>
          </div>

          <div className='mt-2 flex items-center gap-2 
                    text-sm text-[var(--brand-gray-light)]'>
            <Rating // todo!
              name="simple-controlled"
              value={3}
              onChange={(event, newValue) => {
                setValue(newValue);
              
              }}
            />
            <span className='text-m pt-0.5'>3 (12 ratings)</span>
          </div>

          <div className='mt-2 flex gap-4'>
            <span className='border-2 border-[var(--brand-dark)] rounded-md
                          text-[var(--brand-dark)] px-2 py-1 text-sm'>
              vegetarian
            </span>
            <span className='border-2 border-[var(--brand-dark)] rounded-md
                          text-[var(--brand-dark)] px-2 py-1 text-sm'>
              vegetarian
            </span>
          </div>
          
          <p className='mt-10 grow
                        text-[var(--brand-gray-light)] text-sm p-3
                        border border-[var(--brand-dark)]/10 rounded-xl '>Inleiding over recept</p>

        </div>
      </div>

      <div className='mt-5 flex-col md:flex-row flex gap-6'>
        <IngredientsCard/>
        <InstructionsSection/>

      </div>
    </div>
  );
}