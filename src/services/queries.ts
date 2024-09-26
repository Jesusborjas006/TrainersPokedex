import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getPokemon,
  getPokemonAbility,
  getPokemonDetails,
  getPokemonSpecies,
} from "./api";
import { PokemonType } from "../types/pokemon";

export const usePokemon = (startId: number, limit: number) => {
  return useQuery({
    queryKey: ["pokemon", { startId, limit }],
    queryFn: () => getPokemon(startId, limit),
  });
};

export const usePokemonDetails = (
  pokemonData: UseQueryResult<PokemonType, Error>
) => {
  return useQueries({
    queries: (pokemonData.data?.results ?? []).map(
      (pokemon: { name: string }) => {
        return {
          queryKey: ["pokemon", pokemon.name, "pokemonDetails"],
          queryFn: () => getPokemonDetails(pokemon.name),
        };
      }
    ),
  });
};

export const usePokemonSpecies = (pokemonName: string) => {
  return useQuery({
    queryKey: ["species", pokemonName],
    queryFn: () => getPokemonSpecies(pokemonName),
    enabled: pokemonName !== "",
  });
};

export const usePokemonAbility = (path: string | undefined) => {
  return useQuery({
    queryKey: ["abilities", path],
    queryFn: () => {
      if (!path) {
        return Promise.reject("No path provided");
      }
      return getPokemonAbility(path);
    },
    enabled: !!path,
  });
};
