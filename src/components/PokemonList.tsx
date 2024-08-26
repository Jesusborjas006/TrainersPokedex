import { usePokemon, usePokemonDetails } from "../services/queries";

const PokemonList = () => {
  const pokemon = usePokemon();
  const pokemonDetails = usePokemonDetails(pokemon);

  const areAnyPending = pokemonDetails.every(
    (query) => query.status === "pending"
  );

  const areAnyFailing = pokemonDetails.every(
    (query) => query.status === "error"
  );

  if (areAnyPending) return <span>Loading data...</span>;
  if (areAnyFailing) return <span>Can't load pokemon data</span>;

  return (
    <div className="grid grid-cols-4 gap-5 pt-10 text-center px-4">
      {pokemonDetails.map((pokemon) =>
        pokemon.data ? (
          <div
            className="border cursor-pointer rounded-xl"
            key={pokemon.data.id}
          >
            <img
              className="mx-auto"
              src={pokemon.data.sprites}
              alt={pokemon.data.name}
            />
            <p>{pokemon.data.name}</p>
            {pokemon.data.types.map((type: string[]) => (
              <p>{type}</p>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
};

export default PokemonList;
