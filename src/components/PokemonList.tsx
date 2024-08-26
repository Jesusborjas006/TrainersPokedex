import { usePokemon, usePokemonDetails } from "../services/queries";
import Pokemon from "./Pokemon";

const PokemonList = () => {
  const pokemon = usePokemon();
  const pokemonDetails = usePokemonDetails(pokemon);

  const areAnyPending = pokemonDetails.some(
    (query) => query.status === "pending"
  );

  const areAnyFailing = pokemonDetails.some(
    (query) => query.status === "error"
  );

  if (areAnyPending) return <span>Loading data...</span>;
  if (areAnyFailing) return <span>Can't load pokemon data</span>;

  const pokemonElements = pokemonDetails.map(
    (pokemon) =>
      pokemon.data && (
        <Pokemon
          key={pokemon.data.id}
          id={pokemon.data.id}
          name={pokemon.data.name}
          image={pokemon.data.sprites}
          types={pokemon.data.types}
        />
      )
  );

  return (
    <div className="grid grid-cols-4 gap-5 pt-10 text-center px-4">
      {pokemonElements}
    </div>
  );
};

export default PokemonList;
