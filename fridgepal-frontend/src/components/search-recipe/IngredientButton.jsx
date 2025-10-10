export default function IngredientButton({name,handleDeleteIngredient}){
  
  const handleClick = () => {
    handleDeleteIngredient(name);
  };

  return(
    <div 
      className="bg-[var(--brand-orange)] text-white flex w-fit px-3 py-1 rounded text-sm">
      {name}
      <button className="ml-2 font-extralight hover:text-red-600"
        onClick={handleClick}>x</button>
    </div>
  );
}