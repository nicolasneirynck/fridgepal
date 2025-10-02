import RecipeCard from './RecipeCard';

export default function RecipeCardList({ recipes = [] }) {
  if (recipes.length === 0) {
    return (
      <p className="text-gray-400 text-sm italic p-6">
        No recipes found
      </p>
    );
  }

  return (
    <div className="grid gap-6 p-6 
                    [grid-template-columns:repeat(auto-fit,minmax(250px,330px))]">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
