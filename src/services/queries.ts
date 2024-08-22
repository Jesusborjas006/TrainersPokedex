import { useQuery } from "@tanstack/react-query";
import { getPokemonNames } from "./api";

export const usePokemonNames = () => {
  return useQuery({
    queryKey: ["pokemonNames"],
    queryFn: getPokemonNames,
  });
};
