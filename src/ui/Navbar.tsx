import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-red-500 text-white px-10 py-4 flex items-end justify-between">
      <h2 className="text-2xl">Trainers Pokedex</h2>
      <NavLink to="pokedex/favorites" className="text-xl">
        Favorites
      </NavLink>
    </nav>
  );
};

export default Navbar;
