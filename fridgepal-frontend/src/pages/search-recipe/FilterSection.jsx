import useSWR from 'swr';
import { getAll } from '../../api';
import { useState } from 'react';

const FilterSelect = ({options,onSelect}) => {
  const [value, setValue] = useState(''); // standaard "Categorieën"

  const handleChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      onSelect(selected);
      setValue(''); // reset naar “Categorieën”
    }
  };

  return(
    <div className="relative inline-block">
      <select 
        value={value}
        className='appearance-none border rounded-lg p-2 pr-10 border-gray-200 '
        onChange={handleChange}>
        <option value=''>
          Categorieën</option>
        {options.map((op) => {
          return(<option key={op} value={op}>{op}</option>);
        })}
      </select>
      <span
        className="
      pointer-events-none
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      text-gray-400
      text-sm
    "
      >
        ▼
      </span>
    </div>
  );
};

export default function FilterSection({onFilterChange}){
  const { data: categories = [] } = useSWR('categories', getAll);
  const categoryOptions = categories.map((cat) => cat.name);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelect = (cat) => {
    if (!cat) return;
    if (!selectedCategories.includes(cat)) {
      const updated = [...selectedCategories, cat];
      setSelectedCategories(updated);
      onFilterChange(updated);
    }
  };

  const handleRemove = (cat) => {
    const updated = selectedCategories.filter((c) => c !== cat);
    setSelectedCategories(updated);
    onFilterChange(updated);
  };

  return(
    <section className="ml-4 mb-6">
      <h2 className='my-5 text-[var(--brand-gray-dark)] text-xl font-medium'>Jouw Recepten</h2>
      <div className='flex gap-3 items-center'>
        <div className='flex gap-2 text-[var(--brand-gray-light)] text-sm font-light'>
          <img src='/filter.png' className='w-4'/>
          <span>Filter op:</span>
        </div>
        <FilterSelect options={categoryOptions} onSelect={handleSelect}  />
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {selectedCategories.map((cat) => (
          // TODO -> deze button gebruik ik ook voor ingredient, UI component van maken!
          <div 
            className="bg-[var(--brand-orange)] text-white flex w-fit px-3 py-1 rounded text-sm">
            {cat}
            <button
              key={cat}
              onClick={() => handleRemove(cat)}
              className="ml-2 font-extralight hover:text-red-600"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}