import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonAbility, usePokemonSpecies } from "../services/queries";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { TypeColorTypes } from "../types/pokemon";
import StatsBar from "../components/StatsBar";
import { getPokemonInfo } from "../services/api";
import LoadingSpinner from "../ui/LoadingSpinner";
import Navbar from "../ui/Navbar";

const Details = () => {
  const navigate = useNavigate();
  const pokemonEndpoint = useParams();
  const {
    data: pokemonInfo,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["pokemonDetails", pokemonEndpoint.pokemon],
    queryFn: () => getPokemonInfo(pokemonEndpoint.pokemon),
  });
  const pokemonSpecies = usePokemonSpecies(pokemonEndpoint.pokemon);
  const pokemonAbility = usePokemonAbility(pokemonInfo?.ability.url);

  const pokemonStats = pokemonInfo?.stats;

  const formattedStats = pokemonStats?.map((stat) => {
    return {
      ...stat,
      stat: stat.stat.name,
    };
  });

  let detailsContent;
  if (isPending) {
    detailsContent = <LoadingSpinner />;
  } else if (isError) {
    detailsContent = (
      <div className="text-center text-white mt-10">
        <p className="text-xl">
          There's been an error fetching data for {pokemonEndpoint.pokemon}.
        </p>
        <button
          className="bg-white text-black rounded-md px-3 py-1 mt-4 font-medium hover:bg-red-700 hover:text-white"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  } else {
    detailsContent = (
      <div className="bg-slate-100 py-8 rounded-xl">
        <h2 className="text-center capitalize text-2xl font-semibold pb-4">
          {pokemonInfo.name}{" "}
          <span className=" font-light">
            | #{formattedPokemonId(String(pokemonInfo.id))}
          </span>
        </h2>
        <div className="flex w-[90%] justify-center gap-x-6 mx-auto py-4">
          <div className="w-[35%]">
            <img
              className="object-cover bg-gray-300 rounded-lg"
              src={pokemonInfo.sprites[1]}
              alt={pokemonInfo.name}
            />
          </div>
          <div className="w-[55%] space-y-2">
            <p>{pokemonSpecies.data?.description}</p>
            <h3 className="text-xl font-medium">Type</h3>
            <ul className="flex gap-x-2 capitalize text-center text-white">
              {pokemonInfo.types.map((type) => (
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
            <p>Height: {pokemonInfo.height}</p>
            <p>Weight: {pokemonInfo.weight}</p>
            <p>
              Growth Rate:{" "}
              <span className="capitalize">
                {pokemonSpecies.data?.growth_rate}
              </span>
            </p>
            <p className="capitalize">Ability: {pokemonInfo.ability.name}</p>
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
    );
  }

  return (
    <>
      <Navbar />
      <section className="max-w-[1200px] mx-auto">
        <button className="my-6 text-white" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
        {detailsContent}
      </section>
    </>
  );
};

export default Details;
