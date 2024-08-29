import { TypeColorTypes } from "../types/pokemon";

export const formattedPokemonId = (pokemonId: string) => {
  let formattedId;
  if (pokemonId.length === 1) {
    formattedId = `000${pokemonId}`;
  } else if (pokemonId.length === 2) {
    formattedId = `00${pokemonId}`;
  } else if (pokemonId.length === 3) {
    formattedId = `00${pokemonId}`;
  }
  return formattedId;
};

export const typeColors: TypeColorTypes = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};
