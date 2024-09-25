import { UseQueryResult } from "@tanstack/react-query";
import Pokemon from "./Pokemon";
import ListGrid from "../layouts/ListGrid";
import LoadingSpinner from "../ui/LoadingSpinner";
import { PokemonFavoriteTypes } from "../types/pokemon";

interface PokemonListProps {
  pokemonDetails: UseQueryResult<PokemonFavoriteTypes, Error>[];
  addToFavorites: (pokemonId: number) => void;
  favorites: [] | PokemonFavoriteTypes[];
  searchInput: string;
}

const PokemonList = ({
  pokemonDetails,
  addToFavorites,
  favorites,
  searchInput,
}: PokemonListProps) => {
  const areAnyPending = pokemonDetails.some(
    (query) => query.status === "pending"
  );

  const areAnyFailing = pokemonDetails.some(
    (query) => query.status === "error"
  );

  if (areAnyPending) return <LoadingSpinner />;

  if (areAnyFailing) return <span>Can't load pokemon data</span>;

  const searchedPokemon = pokemonDetails.filter((pokemon) => {
    return pokemon.data?.name.includes(searchInput.toLowerCase());
  });

  const pokemonElements = searchedPokemon.map(
    (pokemon) =>
      pokemon.data && (
        <Pokemon
          key={pokemon.data.id}
          id={pokemon.data.id}
          name={pokemon.data.name}
          images={pokemon.data.sprites}
          types={pokemon.data.types}
          addToFavorites={addToFavorites}
          favorites={favorites}
        />
      )
  );
  return (
    <>
      {searchedPokemon.length ? (
        <ListGrid>{pokemonElements}</ListGrid>
      ) : (
        <div className="text-center pt-12 text-white">
          <p>No results for "{searchInput}"</p>
        </div>
      )}
    </>
  );
};

export default PokemonList;
