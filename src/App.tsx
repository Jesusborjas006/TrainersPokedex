import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router";
import Details from "./pages/Details";
import { useState } from "react";
import { usePokemon, usePokemonDetails } from "./services/queries";

function App() {
  const pokemon = usePokemon();
  const pokemonDetails = usePokemonDetails(pokemon);
  const [, setSelectedPokemon] = useState("");

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
