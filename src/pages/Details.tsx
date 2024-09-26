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
  const { pokemon } = pokemonEndpoint;
  const {
    data: pokemonInfo,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["pokemonDetails", pokemonEndpoint.pokemon],
    queryFn: () => getPokemonInfo(pokemon!),
  });
  const abilityUrl = pokemonInfo?.ability.url || "";
  const pokemonSpecies = usePokemonSpecies(pokemon!);
  const pokemonAbility = usePokemonAbility(abilityUrl);

  console.log(pokemonAbility?.data);

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
      <div className="bg-slate-100 pt-8 pb-12 rounded-xl">
        <h2 className="text-center capitalize text-lg sm:text-xl md:text-2xl font-semibold pb-8">
          {pokemonInfo.name}{" "}
          <span className="font-light">
            | #{formattedPokemonId(String(pokemonInfo.id))}
          </span>
        </h2>
        <div className="max-w-[500px] gap-x-4 mx-auto px-4 lg:max-w-none lg:grid lg:grid-cols-2 lg:px-10">
          <div>
            <img
              className="object-cover bg-gray-300 rounded-lg mb-2"
              src={pokemonInfo.sprites[1]}
              alt={pokemonInfo.name}
            />
          </div>
          <div className="pt-4">
            <p>{pokemonSpecies.data?.description}</p>
            <h3 className="text-xl py-4">Type</h3>
            <ul className="flex gap-x-2 capitalize text-center text-white">
              {pokemonInfo.types.map((type) => (
                <li
                  className="py-1 rounded-md inline-block w-[75px] font-medium"
                  style={{
                    backgroundColor: typeColors[type as keyof TypeColorTypes],
                  }}
                  key={type}
                >
                  {type}
                </li>
              ))}
            </ul>
            <ul className="pt-8 space-y-2">
              <li>Height: {pokemonInfo.height}</li>
              <li>Weight: {pokemonInfo.weight} lbs</li>
              <li>
                Growth Rate:{" "}
                <span className="capitalize">
                  {pokemonSpecies.data?.growth_rate}
                </span>
              </li>
              <li className="capitalize">
                Ability: {pokemonInfo.ability.name}
              </li>
              <li>{pokemonAbility.data?.abilityEffect}</li>
            </ul>
          </div>
        </div>
        <div className="h-[500px]">
          <h3 className="text-center text-lg sm:text-xl font-medium my-10 capitalize">
            {pokemonInfo.name}'s Base Stats
          </h3>
          <StatsBar formattedStats={formattedStats} />
        </div>
      </div>
    );
  }

  return (
    <>
      {<Navbar />}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 md:px-10 pt-6 pb-10">
        <button className="mb-4 text-white" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
        {detailsContent}
      </section>
    </>
  );
};

export default Details;
