import { PokemonType } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async (startId: number, limit: number) => {
  const response = await fetch(
    `${BASE_URL}/pokemon?offset=${startId}&limit=${limit}`
  );

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
  const { name, id, sprites, types, weight, height, stats, abilities } = data;

  return {
    name,
    id,
    sprites: [
      sprites.front_default,
      data.sprites.other["official-artwork"].front_default,
    ],
    types: types.map(
      (typeInfo: { type: { name: string } }) => typeInfo.type.name
    ),
    weight,
    height,
    stats,
    ability: abilities[0].ability,
  };
};

export const getPokemonSpecies = async (pokemonName: string) => {
  const response = await fetch(`${BASE_URL}/pokemon-species/${pokemonName}`);

  if (!response.ok) {
    throw new Error("Can't get species");
  }

  const data = await response.json();
  const { flavor_text_entries, growth_rate } = data;
  return {
    description: flavor_text_entries.find(
      (description: { language: { name: string } }) =>
        description.language.name === "en"
    ).flavor_text,
    growth_rate: growth_rate.name,
  };
};

export const getPokemonAbility = async (path: string) => {
  const response = await fetch(path);
  const data = await response.json();
  return data;
};

export const getPokemonEvolutions = async (path: string) => {
  const response = await fetch(path);
  const data = await response.json();
  return data;
};
