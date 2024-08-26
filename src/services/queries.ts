import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "./api";

export const usePokemon = () => {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
  });
};
