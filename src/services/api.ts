import { PokemonType } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async () => {
  const response = await fetch(`${BASE_URL}/pokemon?limit=20`);

  if (!response.ok) {
    throw new Error("Fetch status is not successful");
  }

  const data: PokemonType = await response.json();
  return data;
};

export const getPokemonDetails = async (pokemonName: string) => {
  const response = await fetch(`${BASE_URL}/pokemon/${pokemonName}`);

  if (!response.ok) {
    throw new Error("Failed to fetch pokemon details");
  }

  const data = await response.json();
  console.log(data);
  const { name, id, sprites, types, weight, height, stats } = data;

  return {
    name,
    id,
    sprites: sprites.front_default,
    types: types.map(
      (typeInfo: { type: { name: string } }) => typeInfo.type.name
    ),
    weight,
    height,
    stats,
  };
};

export const getPokemonSpecies = async (pokemonName: string) => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${pokemonName}`);
  const data = await response.json();
  return data;
};
