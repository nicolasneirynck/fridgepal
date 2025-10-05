import { ChefHat} from 'lucide-react';
import Rating from '@mui/material/Rating';
import {useState} from 'react';

export default function RecipeInformation({recipe}){
  const {name, createdBy:{userName}, ratingSummary:{average,count}, categories, description} = recipe;  

  const [value, setValue] = useState(average);

  const CategoryButton = ({categoryName}) => {
    return(
      <span className='border-2 border-[var(--brand-dark)] rounded-md
                          text-[var(--brand-dark)] px-2 py-1 text-sm'>
        {categoryName}
      </span>
    );
  };

  return(
    <div className='basis-100'>
      <h2 className='mb-3 text-3xl text-[var(--brand-gray-dark)] font-bold'>{name}</h2>
      <div className='flex items-center gap-2'>
        <div className='w-8 h-8 bg-[var(--brand-orange)]/10 rounded-full
                          flex justify-center items-center'>
          <ChefHat className="h-4 w-4 text-[var(--brand-orange)]" />
        </div>
        <span className='text-sm text-[var(--brand-gray-light)]'>by {userName}</span>
      </div>

      <div className='mt-2 flex items-center gap-2 
                    text-sm text-[var(--brand-gray-light)]'>
        <Rating // todo!
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          precision={0.1}
        />
        <span className='text-m pt-0.5'>{average} ({count} votes)</span>
      </div>

      <div className='mt-2 flex gap-4'>
        {categories.map((cat) => 
          <CategoryButton 
            key={cat.id} 
            categoryName={cat.name}/>,
        )}
      </div>
          
      <p className='mt-10 grow
                        text-[var(--brand-gray-light)] text-sm p-3
                        border border-[var(--brand-dark)]/10 rounded-xl '>{description}</p>

    </div>
  );
};