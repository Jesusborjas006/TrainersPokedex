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

export const getPokemonDetails = async (path: string) => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon details");
  }

  const data = await response.json();
  console.log(data);
  return data;
};
