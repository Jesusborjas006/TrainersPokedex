import { UseQueryResult } from "@tanstack/react-query";
import Pokemon from "./Pokemon";
import ListGrid from "../layouts/ListGrid";
import LoadingSpinner from "../ui/LoadingSpinner";

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
  favorites: {
    name: string;
    id: number;
    sprites: string[];
    types: string[];
    weight: number;
    height: number;
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
    ability: {
      name: string;
      url: string;
    };
  }[];
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

  if (areAnyPending)
    return (
      // <p className="text-white text-center text-lg pt-10">Loading data...</p>
      <LoadingSpinner />
    );
  if (areAnyFailing) return <span>Can't load pokemon data</span>;

  const searchedPokemon = pokemonDetails.filter((pokemon) => {
    return pokemon.data?.name.includes(searchInput);
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
  return <ListGrid>{pokemonElements}</ListGrid>;
};

export default PokemonList;
