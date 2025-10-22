import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form'; // ✅ gedeelde formcontext

import { getAll } from '../../api';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
import { useEffect } from 'react';

export default function EditDetails(){

  const { register,setValue } = useFormContext();

  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data, error, isLoading } = useSWR('categories', getAll);

  function toggleCategory(id){
    setSelectedCategories((prev) => 
      prev.includes(id)
        ?prev.filter((c) => c!=id)
        :[...prev,id],
    );
  }

  // TODO juist gebruik vna use Effect?
  useEffect(() => {
    setValue('categories', selectedCategories);
  }, [selectedCategories, setValue]);

  return(
    <div className="flex justify-around w-full">
      <div className="w-2/5">
        <div className="flex flex-col gap-1">
          <label htmlFor='recipeName' className="text-[var(--brand-gray-dark)] text-sm">
            Recept Naam
          </label>
          <input
            {...register('name')}
            id='name'
            name='name'
            type='text'
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
            {...register('description')}
            id='description'
            name='description'
            type='text'
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
            {...register('time')}
            id='time'
            name='time'
            type='number'
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
          <AsyncData loading={isLoading} error={error}>
            <div className="flex flex-col gap-1 mt-5">
              <label className="text-[var(--brand-gray-dark)] text-sm mb-1">
                Categorieën
              </label>
              <div className='flex gap-2 flex-wrap'>
                {data?.map((cat) =>
                  <button 
                    key={cat.id}
                    type="button"
                    onClick={()=>toggleCategory(cat.id)}
                    className={`px-5 py-1 rounded-md border-2 
                      ${selectedCategories.includes(cat.id)
      ? 'bg-[var(--brand-orange)] text-white border-[var(--brand-orange)]'
      : 'bg-white text-[var(--brand-orange)] border-[var(--brand-dark)]'
    }`}
                  >{cat.name}</button>,
                )}
          
              </div>
            </div>
          </AsyncData>
          <input type="hidden" {...register('categories')} />
        </div>
      </div>
  
    </div>
  );
}