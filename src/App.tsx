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
import NotFound from "./pages/NotFound";
import { PokemonDetailTypes } from "./types/pokemon";

function App() {
  const [pokemonQuery, setPokemonQuery] = useState({
    startId: 0,
    limit: 151,
    region: "Kanto",
  });
  const pokemon = usePokemon(pokemonQuery.startId, pokemonQuery.limit);
  const pokemonDetails = usePokemonDetails(pokemon);
  const [favorites, setFavorites] = useState<PokemonDetailTypes[] | []>([]);
  const [searchInput, setSearchInput] = useState("");

  const addToFavorites = (pokemonId: number) => {
    const pokemonFavoritedData = pokemonDetails.find((pokemon) => {
      return pokemon.data?.id === pokemonId;
    });

    if (!pokemonFavoritedData || !pokemonFavoritedData.data) {
      toast.error("Pokemon data not found.");
      return;
    }

    const namesInFavorites = favorites.map((pokemon) => pokemon?.name);
    const pokemonNameFavorited = pokemonFavoritedData?.data?.name;

    if (
      pokemonNameFavorited &&
      !namesInFavorites.includes(pokemonNameFavorited)
    ) {
      setFavorites([...favorites, pokemonFavoritedData.data]);
      toast.success(
        capitalizeString(`${pokemonNameFavorited} added to favorites.`)
      );
    }
  };

  const removeFromFavorites = (pokemonId: number) => {
    const updatedFavorites = favorites.filter((pokemon) => {
      return pokemon?.id !== pokemonId;
    });
    setFavorites(updatedFavorites);
  };

  return (
    <>
      <main className="bg-slate-700 min-h-screen relative">
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
          <Route path="pokedex/:pokemon" element={<Details />} />
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
            path="/pokedex/compare-stats"
            element={<PokemonStatsComparison />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
