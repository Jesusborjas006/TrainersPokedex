const BASE_URL = "https://pokeapi.co/api/v2";

interface Pokemon {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
}

export const getPokemonNames = async () => {
  const response = await fetch(`${BASE_URL}/pokemon`);

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const data: Pokemon = await response.json();
  return data.results.map((pokemon) => pokemon.name);
};

// export const getPokemon = async (name: string) => {
//   const response = await fetch(`${BASE_URL}/pokemon/${name}`);

//   return response.json();
// };
