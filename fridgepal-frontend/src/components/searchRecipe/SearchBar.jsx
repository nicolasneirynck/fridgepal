export default function SearchBar(){
  return(
    <form className="flex max-w-xl pt-4">
      <input
        type="text"
        placeholder="Add ingredients you have..."
        className="flex-1 bg-[var(--input)] border rounded-lg border-gray-300 text-sm p-2"
      />
      <button 
        className="bg-[var(--brand-orange)] flex basis-10 shrink-0 h-10 
        justify-center items-center text-white rounded-lg text-2xl ml-2 
          font-extralight">
        +
      </button>
    </form>
  );
}