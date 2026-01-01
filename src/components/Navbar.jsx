import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';

function Navbar() {
  return (
    <header className="bg-transparent px-5 py-3">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex gap-3 flex-row justify-between items-center">
          <h1 className="text-lg sm:text-2xl font-bold text-center sm:text-left">MERN Note App</h1>
          <ThemeToggle />
          </div>
      </div>
    </header>
  );
}

export default Navbar;
