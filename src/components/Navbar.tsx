import { Link } from 'react-router-dom';
import logoImage from '../assets/akumanomi.avif';
import { ThemeSwitch } from './ThemeSwitch';

export const Navbar = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <Link to="/">
          <img src={logoImage} alt="Akumanomi Logo" className="h-10 object-contain" />
      </Link>
      <div className='flex justify-center items-center'>
        <nav className="flex space-x-4">
          <Link to="/hub" className="text-lg dark:text-white font-bold hover:underline">
            Hub
          </Link>
          <Link to="/" className="text-lg dark:text-white font-bold hover:underline">
            Find Fruit
          </Link>
          <Link to="/find-character" className="text-lg dark:text-white font-bold hover:underline">
            Find Character
          </Link>
          <Link to="/characters" className="text-lg dark:text-white font-bold hover:underline">
            Characters
          </Link>
        </nav>
        <ThemeSwitch />
      </div>
    </header>
  );
};