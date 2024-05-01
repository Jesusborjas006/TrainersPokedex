import { useState } from "react";
import { useLazyGetPokemonQuery } from "./apiSlice";

const SearchPokemonForm = () => {
  const [pokemon, setPokemon] = useState("");

  const [fetchTrigger, { data: pokemonSpecies, isLoading, isSuccess }] =
    useLazyGetPokemonQuery({});

  const handlePokemon = (e) => setPokemon(e.target.value);

  console.log(pokemonSpecies);

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
      <div className="border mt-20 rounded-xl">
        <img
          className=" bg-[#eeeae3] w-[250px] rounded-t-xl"
          src={pokemonSpecies.sprites.front_default}
          alt={pokemonSpecies.name}
        />
        <div className="px-2 py-4 rounded-b-xl">
          <h2 className="text-2xl font-medium capitalize">
            {pokemonSpecies.name}
          </h2>
          <p className="text-[#828282]">#{pokemonSpecies.id}</p>
          <ul className="capitalize mt-2">
            {pokemonSpecies.types.map((types) => (
              <li
                className="bg-yellow-500 text-center rounded-md"
                key={types.type.name}
              >
                {types.type.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="flex justify-center">
        <form className=" flex flex-col">
          <label className="mb-1 text-lg">Name or Number: </label>
          <div>
            <input
              className="border mr-4 rounded-md"
              type="text"
              onChange={handlePokemon}
              value={pokemon}
            />
            <button className="border px-2 rounded-md" onClick={submitPokemon}>
              Search
            </button>
          </div>
        </form>
      </section>
      <div className="flex justify-center">{content}</div>
    </>
  );
};

export default SearchPokemonForm;
