import { UseQueryResult } from "@tanstack/react-query";
import Pokemon from "./Pokemon";
import ListGrid from "../layout/ListGrid";

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
  setSelectedPokemon: React.Dispatch<React.SetStateAction<string>>;
  addToFavorites: (pokemonId: number) => void;
}

const PokemonList = ({
  pokemonDetails,
  setSelectedPokemon,
  addToFavorites,
}: PokemonListProps) => {
  const areAnyPending = pokemonDetails.some(
    (query) => query.status === "pending"
  );

  const areAnyFailing = pokemonDetails.some(
    (query) => query.status === "error"
  );

  if (areAnyPending) return <span>Loading data...</span>;
  if (areAnyFailing) return <span>Can't load pokemon data</span>;

  const pokemonElements = pokemonDetails.map(
    (pokemon) =>
      pokemon.data && (
        <Pokemon
          key={pokemon.data.id}
          id={pokemon.data.id}
          name={pokemon.data.name}
          images={pokemon.data.sprites}
          types={pokemon.data.types}
          setSelectedPokemon={setSelectedPokemon}
          addToFavorites={addToFavorites}
        />
      )
  );

  return <ListGrid>{pokemonElements}</ListGrid>;
};

export default PokemonList;
