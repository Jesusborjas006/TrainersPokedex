import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router";
import Details from "./pages/Details";
import { useState } from "react";
import { usePokemon, usePokemonDetails } from "./services/queries";

function App() {
  // Get the pokemons results which is an array of pokemon
  const pokemon = usePokemon();
  // Uses pokemon and maps over results to create a query endpoint for each pokemon
  const pokemonDetails = usePokemonDetails(pokemon);
  // State to show which pokemon card was clicked
  const [, setSelectedPokemon] = useState("");

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PokemonList
                pokemonDetails={pokemonDetails}
                setSelectedPokemon={setSelectedPokemon}
              />
            }
          />
          <Route
            path="/:pokemon"
            element={<Details pokemonDetails={pokemonDetails} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
