import { Plus } from 'lucide-react';

export default function AddDetails(){
  return(
    <div className="flex justify-around w-full">
      <div className="w-2/5">
        <div className="flex flex-col gap-1">
          <label htmlFor='recipeName' className="text-[var(--brand-gray-dark)] text-sm">
            Recept Naam
          </label>
          <input
            id='recipeName'
            name='recipeName'
            type='string'
            className='bg-[var(--input)] rounded-lg border border-gray-300 
            text-sm p-2 outline-none focus:border-[var(--brand-orange)]'
            placeholder='Geef de naam van je recept in...'
            required
          />
        </div>
        <div className="flex flex-col gap-1 mt-5">
          <label htmlFor='recipeName' className="text-[var(--brand-gray-dark)] text-sm">
            Beschrijving
          </label>
          <textarea
            id='recipeDescription'
            name='recipeDescription'
            type='string'
            className='bg-[var(--input)] rounded-lg border border-gray-300 
            text-sm p-2 outline-none focus:border-[var(--brand-orange)] h-30 resize-none'
            placeholder='Geef een korte beschrijving van het recept..'
            required
          />
        </div>
        <div className="flex flex-col gap-1 mt-5">
          <label htmlFor='recipeName' className="text-[var(--brand-gray-dark)] text-sm">
            Bereidingstijd
          </label>
          <input
            id='recipeTime'
            name='recipeTime'
            type='string'
            className='bg-[var(--input)] rounded-lg border border-gray-300 
            text-sm p-2 outline-none focus:border-[var(--brand-orange)]'
            placeholder='Geef de bereidingstijd in aantal minuten..'
            required
          />
        </div>
        
      </div>
      {/* TODO uploadmogelijkheid */}
      <div className="flex flex-col gap-1 w-2/5">
        <div>
          <label htmlFor='recipeImage' className="text-[var(--brand-gray-dark)] text-sm">
            Recept Afbeelding
          </label>
          <div className="border-2 border-dashed border-gray-300 w-full h-30
                    bg-[var(--input)]/40 flex flex-col justify-center items-center">
            <Plus className='text-[var(--brand-gray-dark)] h-10 w-10'/>
            <span className='mt-2 text-[var(--brand-gray-dark)]'>Voeg een afbeelding van je recept toe</span>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-1 mt-5">
            <label htmlFor='recipeCategories' className="text-[var(--brand-gray-dark)] text-sm">
              Recept Categorieën
            </label>
            <div className='flex gap-2 flex-wrap'>
              <button className='bg-white border-2 border-[var(--brand-dark)] rounded-md px-5 py-1
                            text-[var(--brand-orange)]'
              >test</button>
              <button className='bg-white border-2 border-[var(--brand-dark)] rounded-md px-5 py-1
                            text-[var(--brand-orange)]'
              >test</button>
              <button className='bg-white border-2 border-[var(--brand-dark)] rounded-md px-5 py-1
                            text-[var(--brand-orange)]'
              >test</button>
              <button className='bg-white border-2 border-[var(--brand-dark)] rounded-md px-5 py-1
                            text-[var(--brand-orange)]'
              >test</button>
              <button className='bg-white border-2 border-[var(--brand-dark)] rounded-md px-5 py-1
                            text-[var(--brand-orange)]'
              >test</button>
              <button className='bg-white border-2 border-[var(--brand-dark)] rounded-md px-5 py-1
                            text-[var(--brand-orange)]'
              >test</button>
              <button className='bg-white border-2 border-[var(--brand-dark)] rounded-md px-5 py-1
                            text-[var(--brand-orange)]'
              >test</button>
            </div>
          
          </div>
        </div>
      </div>
  
    </div>
  );
}