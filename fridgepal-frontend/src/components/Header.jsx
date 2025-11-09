import { Link } from 'react-router';
import { useAuth } from '../contexts/auth';

export default function Navbar(){

  const AuthButtons = ()=> {
    const { isAuthed } = useAuth();
    return  isAuthed ? (
      <Link className="text-[var(--brand-gray-light)] px-3 py-1 rounded-xl
                        hover:bg-[var(--brand-orange)] hover:text-white" to='/logout'>
        Logout
      </Link>
    ) : (
      <Link className="text-[var(--brand-gray-light)] px-3 py-1 rounded-xl
                        hover:bg-[var(--brand-orange)] hover:text-white" to='/login'>
        Login
      </Link>
    );
  };

  return(
    <header className="flex items-center w-full justify-between relative min-h-18  border-b-1 border-gray-300">
      <Link className='ml-4'>
        <h1 
          className="text-xl font-bold text-[var(--brand-dark)] font-display cursor-pointer"
          to='/'
        >FridgePal</h1></Link>   
      <nav className="flex">
        <Link className="text-[var(--brand-gray-light)] px-3 py-1 rounded-xl
                        hover:bg-[var(--brand-orange)] hover:text-white"
        to='/add-recipe'>+ Voeg Recept Toe</Link>
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <AuthButtons/>
        </div>
      </nav>
    </header>
  );
}