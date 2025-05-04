import { Link } from 'react-router-dom';
import logoImage from '../assets/akumanomi.avif';

export const Navbar = () => {
  return (
    <header className="p-4 flex justify-between items-center">
      <Link to='/'> 
        <img src={logoImage} alt="Akumanomi Logo" className="h-10" />
      </Link>
      <nav>
        <Link to="/hub" className="text-lg font-bold hover:underline pr-4"> 
          Hub
        </Link>
        <Link to="/" className="text-lg font-bold hover:underline pr-12">
          Find Fruit
        </Link>
      </nav>
    </header>
  );
};