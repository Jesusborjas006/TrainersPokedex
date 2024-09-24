import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-red-500 text-white px-10 py-2">
        <div className="max-w-[1200px] flex items-end justify-between mx-auto sticky top-0">
          <h2 className="text-xl">Trainers Pokedex</h2>
          <div className="text-xl space-x-10">
            <NavLink to="/pokedex/favorites" className="hover:underline">
              Favorites
            </NavLink>
            <NavLink to="/pokedex/compare-stats" className="hover:underline">
              Compare Stats
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
