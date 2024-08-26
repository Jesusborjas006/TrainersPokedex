import { useQueries } from "@tanstack/react-query";
import { usePokemon, usePokemonDetails } from "../services/queries";
import { getPokemonDetails } from "../services/api";

const PokemonList = () => {
  const pokemon = usePokemon();
  const pokemonDetails = usePokemonDetails(pokemon);

  const areAnyPending = pokemonDetails.some(
    (query) => query.status === "pending"
  );

  const areAnyFailing = pokemonDetails.some(
    (query) => query.status === "error"
  );

  if (areAnyPending) return <span>Loading data...</span>;
  if (areAnyFailing) return <span>Can't load pokemon data</span>;

  return <div className="grid grid-cols-4 gap-3 pt-10 text-center"></div>;
};

export default PokemonList;
