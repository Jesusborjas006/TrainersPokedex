import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router";
import Details from "./pages/Details";
import { useState } from "react";
import { usePokemon, usePokemonDetails } from "./services/queries";
import Favorites from "./pages/Favorites";

function App() {
  const pokemon = usePokemon();
  const pokemonDetails = usePokemonDetails(pokemon);
  const [, setSelectedPokemon] = useState("");
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (pokemonId: number) => {
    const pokemonFavorited = pokemonDetails.find((pokemon) => {
      return pokemon.data?.id === pokemonId;
    });
    setFavorites([...favorites, pokemonFavorited]);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-700 pb-10 min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <PokemonList
                pokemonDetails={pokemonDetails}
                setSelectedPokemon={setSelectedPokemon}
                addToFavorites={addToFavorites}
              />
            }
          />
          <Route
            path="/:pokemon"
            element={<Details pokemonDetails={pokemonDetails} />}
          />
          <Route path="pokedex/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
