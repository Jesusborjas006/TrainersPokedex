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
