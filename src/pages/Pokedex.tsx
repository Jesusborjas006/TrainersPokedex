import { Toaster } from "react-hot-toast";
import SelectGeneration from "../components/SelectGeneration";
import SearchBar from "../components/SearchBar";
import PokemonList from "../components/PokemonList";
import { UseQueryResult } from "@tanstack/react-query";
import Navbar from "../ui/Navbar";
import { PokemonFavoriteTypes } from "../types/pokemon";

interface PokedexProps {
  pokemonQuery: {
    startId: number;
    limit: number;
    region: string;
  };
  setPokemonQuery: React.Dispatch<
    React.SetStateAction<{
      startId: number;
      limit: number;
      region: string;
    }>
  >;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  pokemonDetails: UseQueryResult<PokemonFavoriteTypes, Error>[];
  addToFavorites: (pokemonId: number) => void;
  favorites: never[];
}

const Pokedex = ({
  pokemonQuery,
  setPokemonQuery,
  searchInput,
  setSearchInput,
  pokemonDetails,
  addToFavorites,
  favorites,
}: PokedexProps) => {
  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <SelectGeneration
        pokemonQuery={pokemonQuery}
        setPokemonQuery={setPokemonQuery}
      />
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      <PokemonList
        pokemonDetails={pokemonDetails}
        addToFavorites={addToFavorites}
        favorites={favorites}
        searchInput={searchInput}
      />
    </>
  );
};

export default Pokedex;
