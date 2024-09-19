import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonAbility, usePokemonSpecies } from "../services/queries";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { TypeColorTypes } from "../types/pokemon";
import StatsBar from "../components/StatsBar";
import { getPokemonInfo } from "../services/api";

const Details = () => {
  const navigate = useNavigate();
  const pokemonEndpoint = useParams();
  const pokemonInfo = useQuery({
    queryKey: ["pokemonDetails", pokemonEndpoint.pokemon],
    queryFn: () => getPokemonInfo(pokemonEndpoint.pokemon),
  });
  const pokemonSpecies = usePokemonSpecies(pokemonEndpoint.pokemon);
  const pokemonAbility = usePokemonAbility(pokemonInfo?.data?.ability.url);

  const pokemonStats = pokemonInfo?.data?.stats;

  const formattedStats = pokemonStats?.map((stat) => {
    return {
      ...stat,
      stat: stat.stat.name,
    };
  });

  if (pokemonInfo.status === "pending")
    return (
      <p className="text-white text-center pt-10 capitalize">
        Loading {pokemonEndpoint.pokemon} data...
      </p>
    );

  if (pokemonInfo.status === "error") return <span>Error loading pokemon</span>;

  console.log(pokemonInfo.status);

  return (
    <section className="max-w-[1200px] mx-auto">
      <button className="my-6 text-white" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <div className="bg-slate-100 py-8 rounded-xl">
        <h2 className="text-center capitalize text-2xl font-semibold pb-4">
          {pokemonInfo.data.name}{" "}
          <span className=" font-light">
            | #{formattedPokemonId(String(pokemonInfo.data.id))}
          </span>
        </h2>
        <div className="flex w-[90%] justify-center gap-x-6 mx-auto py-4">
          <div className="w-[35%]">
            <img
              className="object-cover bg-gray-300 rounded-lg"
              src={pokemonInfo.data.sprites[1]}
              alt={pokemonInfo.data.name}
            />
          </div>
          <div className="w-[55%] space-y-2">
            <p>{pokemonSpecies.data?.description}</p>
            <h3 className="text-xl font-medium">Type</h3>
            <ul className="flex gap-x-2 capitalize text-center text-white">
              {pokemonInfo.data.types.map((type) => (
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
            <p>Height: {pokemonInfo.data.height}</p>
            <p>Weight: {pokemonInfo.data.weight}</p>
            <p>
              Growth Rate:{" "}
              <span className="capitalize">
                {pokemonSpecies.data?.growth_rate}
              </span>
            </p>
            <p className="capitalize">
              Ability: {pokemonInfo.data.ability.name}
            </p>
            <p>{pokemonAbility.data?.abilityEffect}</p>
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
};

export default Details;
