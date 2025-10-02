import FilterSelect from './FilterSelect';

export default function FilterSection(){
  return(
    <section className="ml-4 mb-6">
      <h2 className='my-5 text-[var(--brand-gray-light)] text-xl font-semibold'>Your Recipes</h2>
      <div className='flex gap-3 items-center'>
        <div className='flex gap-2 text-[var(--brand-gray-light)] text-sm font-medium'>
          <img src='/filter.png' className='w-4'/>
          <span>Filter by:</span>
        </div>
        <FilterSelect />
        <FilterSelect />
        <FilterSelect />
        <FilterSelect />
        {/* <Filter /> */}
      </div>
    </section>
  );
}