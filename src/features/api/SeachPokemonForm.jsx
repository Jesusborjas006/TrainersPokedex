import { useState } from "react";
import { useLazyGetPokemonQuery } from "./apiSlice";

const SearchPokemonForm = () => {
  const [pokemon, setPokemon] = useState("");

  const [fetchTrigger, { data: pokemonSpecies, isLoading, isSuccess }] =
    useLazyGetPokemonQuery({});

  const handlePokemon = (e) => setPokemon(e.target.value);

  const submitPokemon = (e) => {
    e.preventDefault();
    if (pokemon) {
      fetchTrigger(pokemon);
    }
    setPokemon("");
  };

  let content;

  if (isLoading) {
    content = <p>Loading Pokemon data...</p>;
  } else if (isSuccess) {
    content = (
      <div>
        <h2>{pokemonSpecies.name}</h2>
      </div>
    );
  }

  return (
    <>
      <form className="text-center">
        <label>Search Pokemon: </label>
        <input
          className="border"
          type="text"
          onChange={handlePokemon}
          value={pokemon}
        />
        <button onClick={submitPokemon}>Submit</button>
      </form>
      {content}
    </>
  );
};

export default SearchPokemonForm;
