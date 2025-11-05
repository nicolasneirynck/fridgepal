import { Link } from 'react-router';

export default function RecipeCard({recipe,MatchingIngredients}){

  const {id,imageUrl,name, createdBy} = recipe;

  return(
    <Link to={`/recipes/${id}`}>
      <div className="bg-[var(--brand-light)] border-[#e5e7eb] border rounded-xl
    hover:shadow-lg transition-all duration-200 cursor-pointer"
      data-cy={`recipe-card-${name.replaceAll(' ','').toLowerCase()}`}
      >
        <img src={imageUrl}
          className="w-full h-55 object-cover rounded-t-xl"/>
        <h3 className="text-[var(--brand-gray-dark)] text-lg font-bold pl-3 pt-3" 
          data-cy={name.replaceAll(' ','').toLowerCase()}>{name}</h3>
        <p className="ml-3 text-sm text-[var(--brand-gray-light)]">by {createdBy.userName}</p>
        <p className="p-3 text-[var(--brand-orange)] font-semibold">
          {MatchingIngredients}/{recipe.ingredients.length} ingredients in your fridge!
        </p>
      </div>
    </Link>
  );
}