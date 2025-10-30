import {useState} from 'react';

const IngredientBadge = ({ingredient,servings}) => {
  return(
    <li className="w-full px-2 py-1 mb-1 w-60 rounded-xl bg-white border border-[var(--brand-dark)]/10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-[var(--brand-orange)] text-lg leading-none">•</span>
          <span className="text-[var(--brand-gray-dark)]">{ingredient.name}</span>
        </div>
        <span>{(ingredient.amount / 4) * servings} {ingredient.unit}</span>
      </div>
    </li>
  );
};

export default function IngredientsCard({ingredients}){

  const [servings, setServings] = useState(4);

  const addServing = () => {
    setServings(servings+1);
  };

  const subtractServing = () => {
    if(servings <= 1)
      return;
    else setServings(servings-1);;
  };

  return(
    <div className="p-5 bg-[var(--brand-light)] border-[#e5e7eb] border rounded-xl">
      <div className='flex justify-between items-center mb-5'>
        <h3 className="text-[var(--brand-gray-dark)] text-lg font-bold" >Ingredients</h3>
        <div className="flex items-center gap-2 ">
          <p className="text-sm text-[var(--brand-gray-light)]">Aantal personen</p>

          {/** voor de categorieen gebruik ik een gelijkaardige Badge dus miss component van maken? */}
          <div className='w-20 border-2 border-[var(--brand-dark)] rounded-md
                          text-[var(--brand-dark)] px-2 py-1 text bg-white
                          flex justify-between'>
            <button className="w-5 hover:cursor-pointer" onClick={subtractServing}>-</button>
            <span>{servings}</span>
            <button className="w-5 hover:cursor-pointer" onClick={addServing}>+</button>
          </div>
        </div>
      </div>
      <div>
        <ul className="mt-2 list-none">
          {ingredients.map((ing) => 
            <IngredientBadge key={ing.name} ingredient={ing} servings={servings}/>,
          )}
        </ul>
      </div>
    </div>
  );
}