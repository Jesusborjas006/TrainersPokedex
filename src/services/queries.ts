import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { getPokemon, getPokemonDetails } from "./api";
import { PokemonType } from "../types/pokemon";

export const usePokemon = () => {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
  });
};

export const usePokemonDetails = (
  pokemonData: UseQueryResult<PokemonType, Error>
) => {
  return useQueries({
    queries: (pokemonData.data?.results ?? []).map((pokemon) => {
      return {
        queryKey: ["pokemon", pokemon.name, "pokemonDetails"],
        queryFn: () => getPokemonDetails(pokemon.name),
      };
    }),
  });
};
