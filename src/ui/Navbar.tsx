import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-red-500 text-white px-4 py-2 sm:px-6 md:px-10">
        <div className="max-w-[1200px] flex items-center justify-between mx-auto sticky top-0">
          <h2 className="sm:text-lg font-medium">TrainersPokedex</h2>
          <div className="space-x-2 text-sm sm:text-base sm:space-x-4 md:space-x-6">
            <NavLink to="/pokedex/favorites" className="hover:underline">
              Favorites
            </NavLink>
            <NavLink to="/pokedex/compare-stats" className="hover:underline">
              Compare-Stats
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
