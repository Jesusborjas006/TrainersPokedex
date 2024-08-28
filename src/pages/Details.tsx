import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonAbility, usePokemonSpecies } from "../services/queries";
import { getPokemonEvolutions } from "../services/api";

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

  // const pokemonEvolutions = useQuery({
  //   queryKey: ["evolutions"],
  //   queryFn: () =>
  //     getPokemonEvolutions(pokemonSpecies?.data.evolution_chain.url),
  // });

  const formatPokemonId = (pokemonId: string) => {
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

  if (!pokemonData)
    return (
      <p className="capitalize">Loading {pokemonEndpoint.pokemon} data...</p>
    );

  if (pokemonData.data) {
    return (
      <section className="max-w-[1200px] mx-auto">
        <button className="my-6 text-white" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
        <div className="bg-slate-100 py-4 rounded-xl">
          <h2 className="text-center capitalize text-2xl font-semibold ">
            {pokemonData.data.name}{" "}
            <span className=" font-light">
              | #{formatPokemonId(String(pokemonData.data.id))}
            </span>
          </h2>
          <div className="flex border pt-4">
            <div className="w-[50%] border">
              <img
                className="w-full object-cover "
                src={pokemonData.data.sprites[1]}
                alt={pokemonData.data.name}
              />
            </div>
            <div className="border W-[50%]">
              <p>{pokemonSpecies.data?.flavor_text_entries[0].flavor_text}</p>
              <h3 className="text-xl font-medium">Types</h3>
              <ul className="flex gap-x-2 capitalize">
                {pokemonData.data.types.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
              <p>Height: {pokemonData.data.height}</p>
              <p>Weight: {pokemonData.data.weight}</p>
              <p>Growth Rate: {pokemonSpecies.data?.growth_rate.name}</p>
              <p>Ability: {pokemonData.data.ability.name}</p>
              <p>{pokemonAbility.data?.effect_entries[0].effect}</p>
            </div>
          </div>
          <ul>
            {pokemonData.data.stats.map((stat) => (
              <li key={stat.stat.url}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
          <h2>Evolutions</h2>
          {/* <p> */}
          {/* {pokemonData.data.name} ---= */}
          {/* {pokemonEvolutions?.data?.chain?.evolves_to[0].species.name} ---= */}
          {/* {
              pokemonEvolutions?.data?.chain?.evolves_to[0].evolves_to[0]
                .species.name
            } */}
          {/* </p> */}
        </div>
      </section>
    );
  }
};

export default Details;
