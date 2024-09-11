import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonAbility, usePokemonSpecies } from "../services/queries";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { TypeColorTypes } from "../types/pokemon";

interface PokemonProps {
  pokemonDetails: UseQueryResult<
    {
      name: string;
      id: number;
      sprites: string[];
      types: string[];
      height: number;
      weight: number;
      stats: {
        base_stat: number;
        effort: number;
        stat: {
          name: string;
          url: string;
        };
      }[];
      ability: {
        name: string;
        url: string;
      };
    },
    Error
  >[];
}

const Details = ({ pokemonDetails }: PokemonProps) => {
  const navigate = useNavigate();
  const pokemonEndpoint = useParams();
  const pokemonData = pokemonDetails.find(
    (pokemon) => pokemon.data?.name === pokemonEndpoint.pokemon
  );
  const pokemonSpecies = usePokemonSpecies(pokemonData?.data.name);
  const pokemonAbility = usePokemonAbility(pokemonData?.data?.ability.url);

  console.log(pokemonData?.data);

  if (!pokemonData)
    return (
      <p className="text-white text-center pt-10 capitalize">
        Loading {pokemonEndpoint.pokemon} data...
      </p>
    );

  if (pokemonData.data) {
    return (
      <section className="max-w-[1200px] mx-auto">
        <button className="my-6 text-white" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
        <div className="bg-slate-100 py-8 rounded-xl">
          <h2 className="text-center capitalize text-2xl font-semibold pb-4">
            {pokemonData.data.name}{" "}
            <span className=" font-light">
              | #{formattedPokemonId(String(pokemonData.data.id))}
            </span>
          </h2>
          <div className="flex w-[90%] justify-center gap-x-6 mx-auto py-4">
            <div className="w-[35%]">
              <img
                className="object-cover bg-gray-300 rounded-lg"
                src={pokemonData.data.sprites[1]}
                alt={pokemonData.data.name}
              />
            </div>
            <div className="w-[55%] space-y-2">
              <p>{pokemonSpecies.data?.flavor_text_entries[0].flavor_text}</p>
              <h3 className="text-xl font-medium">Type</h3>
              <ul className="flex gap-x-2 capitalize text-center text-white">
                {pokemonData.data.types.map((type) => (
                  <li
                    style={{
                      backgroundColor: typeColors[type as keyof TypeColorTypes],
                      padding: "2px 0",
                      borderRadius: "4px",
                      display: "inline-block",
                      width: "70px",
                    }}
                    key={type}
                  >
                    {type}
                  </li>
                ))}
              </ul>
              <p>Height: {pokemonData.data.height}</p>
              <p>Weight: {pokemonData.data.weight}</p>
              <p>Growth Rate: {pokemonSpecies.data?.growth_rate.name}</p>
              <p className="capitalize">
                Ability: {pokemonData.data.ability.name}
              </p>
              <p>{pokemonAbility.data?.effect_entries[0].effect}</p>
              <h3 className="text-center font-semibold text-xl pt-10">
                Pokemon Base Stats
              </h3>
              <ul className="flex flex-col justify-center border">
                {pokemonData.data.stats.map((stat) => (
                  <li className="capitalize" key={stat.stat.url}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Details;
