import { Pokemon } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async () => {
  const response = await fetch(`${BASE_URL}/pokemon`);

  if (!response.ok) {
    throw new Error("Fetch status is not successful");
  }

  const data: Pokemon = await response.json();
  return data;
};
