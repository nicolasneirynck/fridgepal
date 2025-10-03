import IngredientButton from './IngredientButton';

export default function IngredientList({ ingredients = [],handleDeleteIngredient }) {

  const handleClick = () => {
    alert('delete ingredient');
  };

  if (ingredients.length === 0) {
    return (
      <p className="text-gray-400 text-sm italic mt-3 mb-2">
        No ingredients added yet
      </p>
    );
  }

  return (
    <div className="mt-3 mb-2">
      <p className="text-gray-500 text-sm font-medium">Your ingredients:</p>
      <div className="flex gap-2 flex-wrap">
        {ingredients.map((ingredient) => (
          <IngredientButton key={ingredient} 
            name={ingredient} 
            handleDeleteIngredient={handleDeleteIngredient}/>
        ))}
      </div>
    </div>
  );
}