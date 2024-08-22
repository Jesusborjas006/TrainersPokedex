const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemonId = async () => {
  const response = await fetch(`${BASE_URL}/pokemon`);

  return response.json();
};
