import { ChefHat, Heart, Star,Pencil, Trash} from 'lucide-react';
import Rating from '@mui/material/Rating';
import {useState} from 'react';
import { Link } from 'react-router'; 
import AsyncData from '../AsyncData';

export default function RecipeInformation({recipe, onDelete}){
  const {id,name, createdBy:{userName}, categories, description} = recipe;  

  const [tempRating, setTempRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);

  const CategoryButton = ({categoryName}) => {
    return(
      <span className='border-2 border-[var(--brand-dark)] rounded-md
                          text-[var(--brand-dark)] px-2 py-1 text-sm'>
        {categoryName}
      </span>
    );
  };

  //TODO apart zetten buiten component?
  const Button = (element)=> {
    return(
      <button className='flex justify-center items-center rounded-full h-9 w-9 hover:bg-[var(--brand-dark)]/10 
                          border-2 border-[var(--brand-dark)]/20'
      onClick={() => setIsFavorite(!isFavorite)}>
        {element}
      </button>
    );
  };

  const handleRatingSubmit = () => {
    console.log('-> API!', tempRating);
  };

  return(
    <div>
      <main>
        <div className='flex justify-between'>
          <h2 className='mb-3 text-3xl text-[var(--brand-gray-dark)] font-bold'>{name}</h2>
          <div className='flex gap-2'>
            <Link to={`/recipes/edit/${id}`}
              className='flex justify-center items-center rounded-full h-9 w-9 hover:bg-[var(--brand-dark)]/10 
                          border-2 border-[var(--brand-dark)]/20'>
              <Pencil className='h-4 w-4 text-[var(--brand-dark)]'></Pencil>
            </Link>
            {/* // TODO warning!! */}
            <button
              onClick={() => onDelete(recipe.id)}
              className='flex justify-center items-center rounded-full h-9 w-9 hover:bg-[var(--brand-dark)]/10 
                          border-2 border-[var(--brand-dark)]/20'>
              <Trash className='h-4 w-4 text-[var(--brand-dark)]'></Trash>
            </button>
          </div>
        </div>
        <div className='flex gap-3 mb-2'>
          <button className='flex justify-center items-center rounded-full h-9 w-9 hover:bg-[var(--brand-dark)]/10 
                          border-2 border-[var(--brand-dark)]/20'
          onClick={() => setIsFavorite(!isFavorite)}>
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500':'text-[var(--brand-dark)]'}`} />
          </button>
          
          {/* TODO RATING eerst back-end implementeren -> user nodig */}
          {/* {tempRating === 0
            ? <button className='text-[var(--brand-dark)] text-sm
                        rounded-full hover:bg-[var(--brand-dark)]/5 px-4 py-2'
            onClick={() => setShowRatingDialog(true)}>
              Rate this Recipe
            </button>:
            <button className="flex  items-center gap-2 
              rounded-2xl px-3 hover:border-red-700 border-2 border-[var(--brand-dark)]/20" 
            onClick={() => setShowRatingDialog(true)}>
              
              <span className='text-[var(--brand-gray-light)] text-base'>Your Rating</span>
              <div className='flex items-center gap-1 
                    text-sm text-[var(--brand-gray-light)]'>
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className={`h-4 w-4 
              ${star <= Math.ceil(tempRating)
                    ? 'fill-yellow-400 text-yellow-400'
                    :'text-gray-300'}`} />))}
          
                <span className='text-m ml-2 pt-0.5'></span>
              </div></button>} */}
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-[var(--brand-orange)]/10 rounded-full
                          flex justify-center items-center'>
            <ChefHat className="h-4 w-4 text-[var(--brand-orange)]" />
          </div>
          <span className='text-sm text-[var(--brand-gray-light)]'>by {userName}</span>
        </div>

        {/* <div className='mt-2 flex items-center gap-1 
                    text-sm text-[var(--brand-gray-light)]'>
          {[1,2,3,4,5].map((star) => (
            <Star key={star} className={`h-4 w-4 
              ${star <= Math.ceil(average)
              ? 'fill-yellow-400 text-yellow-400'
              :'text-gray-300'}`} />))}
          
          <span className='text-m ml-2 pt-0.5'>{average} ({count} votes)</span>
        </div> */}

        <div className='mt-2 flex gap-4'>
          {categories.map((cat) => 
            <CategoryButton 
              key={cat.id} 
              categoryName={cat.name}/>,
          )}
        </div>
          
        <p className='mt-10 grow
                        text-[var(--brand-gray-light)] text-sm p-3
                        border border-[var(--brand-dark)]/10 rounded-xl'>{description}</p>

      </main>
      {showRatingDialog &&(
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center'>
          <div className='bg-white rounded-lg p-6 w-full max-w-sm'>
            <h2 className='text-[var(--brand-gray-dark)] text-lg font-bold text-center'>
              Geef een rating aan dit recept</h2>
            <div className='my-1 flex justify-center'>
              <div className="flex items-center gap-2">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setTempRating(star === tempRating ? 0 : star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= tempRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 border border-gray-300 rounded-lg py-2"
                onClick={() => {
                  setTempRating(0);
                  setShowRatingDialog(false);
                }}
              >
                Annuleer
              </button>
              <button className="flex-1 bg-[var(--brand-orange)] text-white rounded-lg py-2"
                onClick={() => {
                  handleRatingSubmit();
                  setShowRatingDialog(false);
                }}
              >
                Bevestig
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};