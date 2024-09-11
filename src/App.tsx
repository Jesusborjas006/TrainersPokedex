import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router";
import Details from "./pages/Details";
import { useState } from "react";
import { usePokemon, usePokemonDetails } from "./services/queries";
import Favorites from "./pages/Favorites";
import SelectGeneration from "./components/SelectGeneration";

function App() {
  const [pokemonQuery, setPokemonQuery] = useState({
    startId: 0,
    limit: 151,
    region: "Kanto",
  });
  const pokemon = usePokemon(pokemonQuery.startId, pokemonQuery.limit);
  const pokemonDetails = usePokemonDetails(pokemon);
  const [favorites, setFavorites] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

      <main className="bg-slate-700 pb-10 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SelectGeneration
                  pokemonQuery={pokemonQuery}
                  setPokemonQuery={setPokemonQuery}
                />
                <div className="flex justify-center mt-10 space-x-2">
                  <label className="text-white">Search Pokemon:</label>
                  <input
                    className="border flex px-1 rounded-sm"
                    type="text"
                    placeholder="Pokemon ID or Name"
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
                <PokemonList
                  pokemonDetails={pokemonDetails}
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                  searchInput={searchInput}
                />
              </>
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
