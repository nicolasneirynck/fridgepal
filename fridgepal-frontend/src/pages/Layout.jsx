import { Outlet, ScrollRestoration } from 'react-router';

import Navbar from '../components/Header';

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className='p-4'>
        <Outlet />
      </div>
      <ScrollRestoration />
    </div>
  );
}
