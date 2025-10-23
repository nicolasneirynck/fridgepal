import { Link } from 'react-router';

export default function Navbar(){

  return(
    <header className="flex items-center relative min-h-18  border-b-1 border-gray-300">
      <Link className='absolute left-4'>
        <h1 
          className="text-xl font-bold text-[var(--brand-dark)] font-display cursor-pointer"
          to='/'
        >FridgePal</h1></Link>   
      <nav className="mx-auto">
        <Link className="text-[var(--brand-gray-light)] px-3 py-1 rounded-xl
                        hover:bg-[var(--brand-orange)] hover:text-white"
        to='/add-recipe'>+ Voeg Recept Toe</Link>
      </nav>
    </header>
  );
}