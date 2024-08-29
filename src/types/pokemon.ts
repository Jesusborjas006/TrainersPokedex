export interface PokemonType {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export interface TypeColorTypes {
  grass: string;
  fire: string;
  water: string;
  bug: string;
  normal: string;
  poison: string;
  electric: string;
  ground: string;
  fairy: string;
  fighting: string;
  psychic: string;
  rock: string;
  ghost: string;
  ice: string;
  dragon: string;
  dark: string;
  steel: string;
  flying: string;
}
