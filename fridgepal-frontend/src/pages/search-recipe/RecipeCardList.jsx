import RecipeCard from '../../components/search-recipe/RecipeCard';

export default function RecipeCardList({ recipes = [] ,countMatchingIngredients,showFavoriteToggle=false}) {
  if (recipes.length === 0) {
    return (
      <p className="text-gray-400 text-sm italic p-6"
        data-cy="no_recipes">
        No recipes found
      </p> // TODO -> mooier maken he
    );
  }

  return (
    <div className="grid gap-6 p-6 
                    [grid-template-columns:repeat(auto-fit,minmax(250px,330px))]"
    >
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          MatchingIngredients={countMatchingIngredients
            ?countMatchingIngredients(recipe.ingredients)
            :undefined}
          showFavoriteToggle={showFavoriteToggle}/>
      ))}
    </div>
  );
}
