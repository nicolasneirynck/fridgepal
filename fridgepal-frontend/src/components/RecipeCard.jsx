export default function RecipeCard(){
  return(
    <div className="bg-[var(--brand-light)] border-[#e5e7eb] border rounded-xl 
    hover:shadow-lg transition-all duration-200 cursor-pointer">
      <img src="/recipe.jpg" 
        className="w-full h-55 object-cover rounded-t-xl"/>
      <h3 className="text-[var(--brand-gray-dark)] text-lg font-bold pl-3 pt-3" >Pasta Norma</h3>
      <p className="ml-3 text-sm text-[var(--brand-gray-light)]">by Nicolas Neirynck</p>
      <p className="p-3 text-[var(--brand-orange)] font-semibold">All ingredients!</p>
    </div>
  );
}