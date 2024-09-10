import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router";
import Details from "./pages/Details";
import { useState } from "react";
import { usePokemon, usePokemonDetails } from "./services/queries";
import Favorites from "./pages/Favorites";

function App() {
  const [pokemonQuery, setPokemonQuery] = useState({
    startId: 0,
    limit: 151,
  });
  const pokemon = usePokemon(pokemonQuery.startId, pokemonQuery.limit);
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
          value={`${pokemonQuery.startId}-${pokemonQuery.limit}`}
          onChange={(e) => {
            const [startId, limit] = e.target.value.split("-");
            console.log(startId, limit);
            setPokemonQuery({
              startId: Number(startId),
              limit: Number(limit),
            });
          }}
        >
          <option value={"0-151"}>Generation One</option>
          <option value={"151-100"}>Generation two</option>
          <option value={"251-135"}>Generation Three</option>
          <option value={"386-107"}>Generation Four</option>
          <option value={"493-156"}>Generation Five</option>
          <option value={"649-72"}>Generation Six</option>
          <option value={"721-88"}>Generation Seven</option>
          <option value={"809-96"}>Generation Eight</option>
          <option value={"905-120"}>Generation Nine</option>
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
