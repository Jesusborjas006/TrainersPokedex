import { useState } from "react";
import { useLazyGetPokemonQuery } from "./apiSlice";

const typeColorStyles = {
  bug: "#234B2C",
  dark: "#040706",
  dragon: "#448B95",
  electric: "#E4E22B",
  fairy: "#EA1369",
  fighting: "#994024",
  fire: "#AB1F23",
  flying: "#93B2C7",
  ghost: "#33336B",
  grass: "#147B3D",
  ground: "#A9702C",
  ice: "#86D1F5",
  normal: "#755259",
  poison: "#9380A8",
  psychic: "#F81C91",
  rock: "#AEA6A5",
  steel: "#44BC94",
  water: "#1552E2",
};

const SearchPokemonForm = () => {
  const [pokemon, setPokemon] = useState("");

  const [
    fetchTrigger,
    { data: pokemonSpecies, isLoading, isSuccess, isError, error },
  ] = useLazyGetPokemonQuery({});

  const handlePokemon = (e) => setPokemon(e.target.value);

  const submitPokemon = (e) => {
    e.preventDefault();
    if (pokemon) {
      fetchTrigger(pokemon.toLowerCase());
    }
    setPokemon("");
  };

  console.log(error);

  let content;

  if (isLoading) {
    content = <p>Loading Pokemon data...</p>;
  } else if (isSuccess) {
    content = (
      <section className="flex mt-20 gap-x-10">
        <div className="border rounded-xl cursor-pointer">
          <img
            className=" bg-[#eeeae3] w-[280px] rounded-t-xl"
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
                  className={`text-center rounded-md my-2 `}
                  style={{ backgroundColor: typeColorStyles[types.type.name] }}
                  key={types.type.name}
                >
                  {types.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="flex gap-x-10">
            <div>
              <h3>Height</h3>
              <p>{pokemonSpecies.height / 2} ft</p>
            </div>
            <div>
              <h3>Weight</h3>
              <p>{pokemonSpecies.weight / 10} lbs</p>
            </div>
          </div>
          <h2 className="font-semibold text-lg mt-6">Base Stats</h2>
          <ul className="flex flex-col gap-2">
            {pokemonSpecies.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  } else if (isError) {
    content = <p className="mt-10">Pokemon {error.data}. Typo maybe?</p>;
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
              Search Pokemon
            </button>
          </div>
        </form>
      </section>
      <div className="flex justify-center">{content}</div>
    </>
  );
};

export default SearchPokemonForm;
