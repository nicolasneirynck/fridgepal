import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form'; // ✅ gedeelde formcontext

import { getAll } from '../../api';
import useSWR from 'swr';
import AsyncData from '../../components/AsyncData';
import { useEffect } from 'react';

const validationRules = {
  name: {
    required: 'Receptnaam is verplicht',
    minLength: { value: 3, message: 'Minstens 3 tekens' },
  },
  description: {
    required: 'Beschrijving is verplicht',
    minLength: { value: 10, message: 'Minstens 10 tekens' },
  },
  time: {
    required: 'Bereidingstijd is verplicht',
    pattern: { value: /^[0-9]+$/, message: 'Enkel cijfers' },
  },
  categories:{
    required: 'Kies minstens 1 categorie',
  },
};

export default function EditDetails(){

  // alles rond form
  const { register,setValue,watch,formState: { errors } } = useFormContext();
  //afbeeldingen uploaden
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  // categorieën ophalen
  const { data, error, isLoading } = useSWR('categories', getAll);

  // AFBEELDINGEN VIA CLOUDINARY
  const imageUrl = watch('imageUrl');

  const CLOUD_NAME = 'dyssxogz5';
  const UPLOAD_PRESET = 'fridgepal';

  useEffect(() => {
    if (imageUrl && !preview) {
      setPreview(imageUrl);
    }
  }, [imageUrl, preview]);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      setValue('imageUrl', data.secure_url);
    } catch (err) {
      console.error('Upload mislukt:', err);
      alert('Uploaden is mislukt. Probeer opnieuw.');
    } finally {
      setUploading(false);
    }
  }

  // CATEGORIEEN

  // telkens setValue('categories') iets doet wordt formCategories geupdate
  // bij leegrecept begin je met een lege array
  const formCategories = watch('categories') || []; 

  function toggleCategory(id) {
    const updated = formCategories.includes(id)
      ? formCategories.filter((c) => c !== id)
      : [...formCategories, id];

    setValue('categories', updated, { shouldValidate: true });
  }

  return(
    <div className="flex justify-around w-full">
      <div className="w-2/5">
        <div className="flex flex-col gap-1">
          <label htmlFor='name' className="text-[var(--brand-gray-dark)] text-sm">
            Recept Naam*
          </label>
          <input
            {...register('name',validationRules.name)}
            id='name'
            name='name'
            type='text'
            className='bg-[var(--input)] rounded-lg border border-gray-300 
            text-sm p-2 outline-none focus:border-[var(--brand-orange)]'
            placeholder='Geef de naam van je recept in...'
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <label htmlFor='description' className="text-[var(--brand-gray-dark)] text-sm">
            Beschrijving*
          </label>
          <textarea
            {...register('description',validationRules.description)}
            id='description'
            name='description'
            type='text'
            className='bg-[var(--input)] rounded-lg border border-gray-300 
            text-sm p-2 outline-none focus:border-[var(--brand-orange)] h-30 resize-none'
            placeholder='Geef een korte beschrijving van het recept..'
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-5">
          <label htmlFor='time' className="text-[var(--brand-gray-dark)] text-sm">
            Bereidingstijd*
          </label>

          <input
            {...register('time',validationRules.time)}
            id='time'
            name='time'
            type='number'
            className='bg-[var(--input)] rounded-lg border border-gray-300 
            text-sm p-2 outline-none focus:border-[var(--brand-orange)]'
            placeholder='Bijvoorbeeld "30"'
          />
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>
        
      </div>
     
      <div className="flex flex-col gap-1 w-2/5">
        <div>
          <label className="text-[var(--brand-gray-dark)] text-sm">
            Recept Afbeelding
          </label>
          <label
            htmlFor="recipeImage"
            className={`border-2 border-dashed border-gray-300 w-full h-40
              bg-[var(--input)]/40 flex flex-col justify-center items-center 
              rounded-md cursor-pointer transition hover:bg-[var(--input)]/60`}
          >
            {uploading ? (
              <span className="text-[var(--brand-gray-dark)]">Uploaden...</span>
            ) : preview ? (
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-full h-full rounded-md"
              />
            ) : (
              <>
                <Plus className="text-[var(--brand-gray-dark)] h-10 w-10" />
                <span className="mt-2 text-[var(--brand-gray-dark)] text-sm">
                  Voeg een afbeelding toe
                </span>
              </>
            )}
            <input
              id="recipeImage"
              name="recipeImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div>
          <AsyncData loading={isLoading} error={error}>
            <div className="flex flex-col gap-1 mt-5">
              <label className="text-[var(--brand-gray-dark)] text-sm mb-1">
                Categorieën*
              </label>
              <div className='flex gap-2 flex-wrap'>
                {data?.map((cat) =>
                  <button 
                    key={cat.id}
                    type="button"
                    onClick={()=>toggleCategory(cat.id)}
                    className={`px-5 py-1 rounded-md border-2 
                      ${formCategories.includes(cat.id)
      ? 'bg-[var(--brand-orange)] text-white border-[var(--brand-orange)]'
      : 'bg-white text-[var(--brand-orange)] border-[var(--brand-dark)]'
    }`}
                  >{cat.name}</button>,
                )}
          
              </div>
              {errors.categories && (
                <p className="text-red-500 text-sm">{errors.categories.message}</p>
              )}
            </div>
          </AsyncData>
          {/*  hidden input zodat de waarden toch geregistreerd worden in formdata  */}
          <input type="hidden" {...register('imageUrl')} />
          <input type="hidden" {...register('categories',validationRules.categories)} />
        </div>
      </div>

    </div>
  );
}