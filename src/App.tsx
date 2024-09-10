import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router";
import Details from "./pages/Details";
import { useState } from "react";
import { usePokemon, usePokemonDetails } from "./services/queries";
import Favorites from "./pages/Favorites";

function App() {
  const [pokemonStartId, setPokemonStartId] = useState(0);
  const pokemon = usePokemon(pokemonStartId);
  const pokemonDetails = usePokemonDetails(pokemon);
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (pokemonId: number) => {
    const pokemonFavoritedData = pokemonDetails.find((pokemon) => {
      return pokemon.data?.id === pokemonId;
    });
    const namesInFavorites = favorites.map((pokemon) => pokemon.name);
    const pokemonNamesFavorited = pokemonFavoritedData?.data?.name;

    if (!namesInFavorites.includes(pokemonNamesFavorited)) {
      setFavorites([...favorites, pokemonFavoritedData.data]);
    }
    return;
  };

  const removeFromFavorites = (pokemonId: number) => {
    const updatedFavorites = favorites.filter((pokemon) => {
      return pokemon.id !== pokemonId;
    });
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <header>{<Navbar />}</header>
      <div className="flex">
        <select
          value={pokemonStartId}
          onChange={(e) => setPokemonStartId(e.target.value)}
        >
          <option value={0}>Generation One</option>
          <option value={151}>Generation two</option>
        </select>
      </div>

      <main className="bg-slate-700 pb-10 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <PokemonList
                pokemonDetails={pokemonDetails}
                addToFavorites={addToFavorites}
                favorites={favorites}
              />
            }
          />
          <Route
            path="/:pokemon"
            element={<Details pokemonDetails={pokemonDetails} />}
          />
          <Route
            path="pokedex/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
