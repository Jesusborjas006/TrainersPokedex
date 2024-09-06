import { UseQueryResult } from "@tanstack/react-query";
import Pokemon from "./Pokemon";
import ListGrid from "../layouts/ListGrid";

interface PokemonListProps {
  pokemonDetails: UseQueryResult<
    {
      name: string;
      id: number;
      sprites: string[];
      types: string[];
    },
    Error
  >[];
  addToFavorites: (pokemonId: number) => void;
}

const PokemonList = ({
  pokemonDetails,
  addToFavorites,
  favorites,
}: PokemonListProps) => {
  const areAnyPending = pokemonDetails.some(
    (query) => query.status === "pending"
  );

  const areAnyFailing = pokemonDetails.some(
    (query) => query.status === "error"
  );

  if (areAnyPending) return <span>Loading data...</span>;
  if (areAnyFailing) return <span>Can't load pokemon data</span>;

  console.log(pokemonDetails.map((pokemon) => pokemon.data?.activeStar));

  const pokemonElements = pokemonDetails.map(
    (pokemon) =>
      pokemon.data && (
        <Pokemon
          key={pokemon.data.id}
          id={pokemon.data.id}
          name={pokemon.data.name}
          images={pokemon.data.sprites}
          types={pokemon.data.types}
          addToFavorites={addToFavorites}
          activeStar={pokemon.data.activeStar}
          // favorites={favorites.activeStar}
        />
      )
  );
  return <ListGrid>{pokemonElements}</ListGrid>;
};

export default PokemonList;
