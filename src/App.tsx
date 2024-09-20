import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router";
import Details from "./pages/Details";
import { useState } from "react";
import { usePokemon, usePokemonDetails } from "./services/queries";
import Favorites from "./pages/Favorites";
import SelectGeneration from "./components/SelectGeneration";
import SearchBar from "./components/SearchBar";
import PokemonStatsComparison from "./pages/PokemonStatsComparison";
import ScrollToTop from "./components/ScrollToTop";
import toast, { Toaster } from "react-hot-toast";
import { capitalizeString } from "./utils/utils";

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
    const pokemonNameFavorited = pokemonFavoritedData?.data?.name;

    if (!namesInFavorites.includes(pokemonNameFavorited)) {
      setFavorites([...favorites, pokemonFavoritedData.data]);
      toast.success(
        capitalizeString(`${pokemonNameFavorited} added to favorites.`)
      );
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
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Toaster position="top-center" />
                <SelectGeneration
                  pokemonQuery={pokemonQuery}
                  setPokemonQuery={setPokemonQuery}
                />
                <SearchBar
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                />
                <PokemonList
                  pokemonDetails={pokemonDetails}
                  addToFavorites={addToFavorites}
                  favorites={favorites}
                  searchInput={searchInput}
                />
              </>
            }
          />
          <Route path="/:pokemon" element={<Details />} />
          <Route
            path="pokedex/favorites"
            element={
              <Favorites
                favorites={favorites}
                removeFromFavorites={removeFromFavorites}
              />
            }
          />
          <Route
            path="/pokemon/compare-stats"
            element={<PokemonStatsComparison />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
