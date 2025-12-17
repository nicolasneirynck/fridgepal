import { Link } from 'react-router';
import useSWR from 'swr';
import { getIsFavorite, toggleFavorite } from '../../api';
import { Heart } from 'lucide-react';

export default function RecipeCard({recipe,matchingIngredients,showFavoriteToggle = false}){

  const {id,imageUrl,name, createdBy:{firstName, lastName}} = recipe;

  const { data: isFavorite, mutate } = useSWR(
    showFavoriteToggle ? `/recipes/${id}/isFavorite` : null,
    () => getIsFavorite(id),
  );

  async function handleFavorite(e) {
    e.preventDefault();

    try {
      mutate(!isFavorite, false);
      await toggleFavorite(id);
    } catch (err) {
      console.error(err);
      mutate(isFavorite, false);
    }
  }

  return(
    <Link to={`/recipes/${id}`}>
      <div className="bg-[var(--brand-light)] border-[#e5e7eb] border rounded-xl
    hover:shadow-lg transition-all duration-200 cursor-pointer"
      data-cy={`recipe-card-${name.replaceAll(' ','').toLowerCase()}`}
      >
        <img
          src={imageUrl}
          className="w-full h-55 object-cover rounded-t-xl"
        />

        <div className="flex justify-between items-start p-3">
          <div>
            <h3 className="text-[var(--brand-gray-dark)] text-lg font-bold"
              data-cy={name.replaceAll(' ', '').toLowerCase()}>
              {name}
            </h3>
            <p className="text-sm text-[var(--brand-gray-light)]">
              {firstName + ' ' + lastName}
            </p>
          </div>

          {showFavoriteToggle && isFavorite !== undefined && (
            <button
              onClick={handleFavorite}
              className="h-8 w-8 rounded-full flex justify-center items-center
                         hover:bg-[var(--brand-dark)]/10 border border-gray-200"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-[var(--brand-dark)]'
                }`}
              />
            </button>
          )}
        </div>

        {matchingIngredients !== undefined && (
          <p className="p-3 text-[var(--brand-orange)] font-semibold">
            {matchingIngredients}/{recipe.ingredients.length} ingrediënten in je frigo!
          </p>
        )}
      </div>
    </Link>
  );
}