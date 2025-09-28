export default function SearchBar(){
  return(
    <form className="flex pt-4">
      <input
        type="text"
        placeholder="Add ingredients you have..."
        className="basis-100 grow bg-gray-50 border rounded-lg border-gray-300 text-sm p-2"
      />
      <button 
        className="bg-[#f97316] flex w-10 h-10 justify-center items-center text-white rounded-lg text-2xl ml-2 
          font-extralight">
        +
      </button>
    </form>
  );
}