import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonAbility, usePokemonSpecies } from "../services/queries";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { TypeColorTypes } from "../types/pokemon";
import StatsBar from "../components/StatsBar";

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

  console.log(pokemonSpecies?.data);

  const pokemonStats = pokemonData?.data?.stats;

  const formattedStats = pokemonStats?.map((stat) => {
    return {
      ...stat,
      stat: stat.stat.name,
    };
  });

  if (!pokemonData)
    return (
      <p className="text-white text-center pt-10 capitalize">
        Loading {pokemonEndpoint.pokemon} data...
      </p>
    );

  // I need the growth rate and .flavor_text_entries[0].flavor_text in english

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
              <p>{pokemonSpecies.data?.description}</p>
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
            </div>
          </div>
          <div className="h-[500px] mt-20 ">
            <h3 className="text-center text-xl font-medium">
              Pokemon Base Stats
            </h3>
            <StatsBar formattedStats={formattedStats} />
          </div>
        </div>
      </section>
    );
  }
};

export default Details;
