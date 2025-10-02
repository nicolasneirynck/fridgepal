export default function IngredientsCard(){
  return(
    <div className="max-w-100 p-3 bg-[var(--brand-light)] border-[#e5e7eb] border rounded-xl">
      
      <h3 className="text-[var(--brand-gray-dark)] text-lg font-bold" >Ingredients</h3>
      <div className="flex items-center gap-5 ">
        <p className="text-sm text-[var(--brand-gray-light)]">Servings:</p>

        {/** voor de categorieen gebruik ik een gelijkaardige Badge dus miss component van maken? */}
        <div className='w-20 border-2 border-[var(--brand-dark)] rounded-md
                          text-[var(--brand-dark)] px-2 py-1 text bg-white
                          flex justify-between'>
          <button>+</button>
          <span>4</span>
          <button>-</button>
        </div>
        
      </div>
      <div>
        <ul className="mt-2 list-inside list-disc text-[var(--brand-orange)] 
                     ">
          <li className="px-2 py-1 mb-1 w-60 rounded-xl bg-white border border-[var(--brand-dark)]/10">
            <span className="text-[var(--brand-gray-dark)]">test</span></li>
          <li className="px-2 py-1 mb-1 w-60 rounded-xl bg-white border border-[var(--brand-dark)]/10">
            <span className="text-[var(--brand-gray-dark)]">test</span></li>
        </ul>
      </div>
    </div>
  );
}