import Navbar from "./ui/Navbar";
import { Routes, Route, Navigate } from "react-router";
import Details from "./pages/Details";
import { useState } from "react";
import { usePokemon, usePokemonDetails } from "./services/queries";
import Favorites from "./pages/Favorites";
import PokemonStatsComparison from "./pages/PokemonStatsComparison";
import ScrollToTop from "./components/ScrollToTop";
import toast from "react-hot-toast";
import { capitalizeString } from "./utils/utils";
import Pokedex from "./pages/Pokedex";

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
          <Route index element={<Navigate replace to="pokedex" />} />
          <Route
            path="pokedex"
            element={
              <Pokedex
                pokemonQuery={pokemonQuery}
                setPokemonQuery={setPokemonQuery}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                pokemonDetails={pokemonDetails}
                addToFavorites={addToFavorites}
                favorites={favorites}
              />
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
