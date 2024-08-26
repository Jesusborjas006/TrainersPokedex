import { usePokemon } from "../services/queries";

const PokemonList = () => {
  const { data, status } = usePokemon();

  if (status === "pending") return <span>Loading Data..</span>;

  if (status === "error") return <span>An error has occurred</span>;

  return (
    <div>
      {data.results.map((pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
    </div>
  );
};

export default PokemonList;
