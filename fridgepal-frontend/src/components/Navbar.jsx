import { Link } from 'react-router';
import { useAuth } from '../contexts/auth';
import { User} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function Navbar(){

  const { isAuthed } = useAuth();

  const UserNav = ()=> {
    return isAuthed? (<DropdownMenu.Root>
      {/* // TRIGGER */}
      <DropdownMenu.Trigger asChild>
        <button
          className="group flex items-center justify-center rounded-full h-8 w-8
               bg-white text-[var(--brand-gray-light)]
               hover:bg-[var(--brand-orange)] 
               data-[state=open]:bg-[var(--brand-orange)]"
        >
          <User className='size-5 text-[var(--brand-gray-light)] 
          group-hover:text-white group-data-[state=open]:text-white' />
        </button>
      </DropdownMenu.Trigger>

      {/* // DROPDOWN content */}
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="min-w-[180px] bg-white border border-gray-100 
                     rounded-xl shadow-lg p-1 
                     animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <DropdownMenu.Item asChild>
            <Link
              to="/favorites"
              className="block w-full px-4 py-2 rounded-lg text-[var(--brand-gray-dark)] text-sm 
                         hover:cursor-pointer"
            >
              Mijn favoriete recepten (WIP)
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-1 h-px bg-gray-100" />

          <DropdownMenu.Item asChild>
            <Link
              to="/logout"
              className="block w-full px-4 py-2 rounded-lg text-[var(--brand-gray-dark)] text-sm 
                         hover:cursor-pointer"
            >
              Logout
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
    ):null;
    // return  isAuthed ? (
    //   <Link className="text-[var(--brand-gray-light)] px-3 py-1 rounded-xl
    //                     hover:bg-[var(--brand-orange)] hover:text-white" to='/logout'>
    //     Logout
    //   </Link>
    // ) : null;
    //(
    //   <div>
    //     {/* <Link className="text-[var(--brand-gray-light)] px-3 py-1 rounded-xl
    //                     hover:bg-[var(--brand-orange)] hover:text-white" to='/login'>
    //       Login
    //     </Link> */}
        
    //   </div>
    // );
  };

  return(
    <header>
      <nav className="flex items-center justify-between
       w-full relative min-h-18  border-b-1 border-gray-300">
        <Link className='ml-4'>
          <h1 
            className="text-xl font-bold text-[var(--brand-dark)] font-display cursor-pointer"
            to='/'
          >FridgePal</h1>
        </Link>  
        <div className='flex'>
          {isAuthed? (
            <Link className="text-[var(--brand-gray-light)] px-3 py-1 rounded-xl
                        hover:bg-[var(--brand-orange)] hover:text-white"
            to='/add-recipe'>+ Voeg Recept Toe
            </Link>): null}
          {isAuthed?(
            <div className="mr-4 lg:flex lg:items-center lg:space-x-4">
              <UserNav/>
            </div>)
            :null}
        </div> 
      </nav>
    </header>
  );
}