import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getPokemonDetails } from "../services/api";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const PokemonStatsComparison = () => {
  const [pokemonComparison1, setPokemonComparison1] = useState("rayquaza");
  const [pokemonComparison2, setPokemonComparison2] = useState("groudon");
  const { data, status } = useQuery({
    queryKey: ["comparisons", pokemonComparison1],
    queryFn: () => getPokemonDetails(pokemonComparison1),
  });

  const pokemonSelected2 = useQuery({
    queryKey: ["comparisons", pokemonComparison2],
    queryFn: () => getPokemonDetails(pokemonComparison2),
  });
  const navigate = useNavigate();

  const formatStats = (pokemonStats) => {
    const formattedStats = pokemonStats?.stats.map((stat) => {
      return {
        ...stat,
        stat: stat.stat.name,
      };
    });
    return formattedStats;
  };

  if (status === "pending") return <span>Loading...</span>;

  if (status === "error") return <span>Error</span>;

  return (
    <section className="max-w-[1250px] mx-auto px-4">
      <button className="my-6 text-white" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <div className="flex flex-col space-y-10 gap-x-10 md:flex-row md:space-y-0">
        <div className="bg-white rounded-xl flex-1">
          <div className="p-6">
            <img
              className="bg-gray-300 rounded-lg mx-auto w-[55%]"
              src={data.sprites[1]}
              alt={data.name}
            />
          </div>
          <h3 className="text-center capitalize text-lg">{data.name}</h3>
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="mx-auto relative"
            >
              <BarChart
                data={formatStats(data)}
                className="pb-10 text-xs md:text-sm lg:text-base"
                margin={{ bottom: 70 }}
              >
                <Bar dataKey="base_stat" fill="#8884d8" />
                <XAxis
                  dataKey="stat"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis dataKey="base_stat" domain={[0, 200]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className=" bg-white rounded-xl flex-1">
          <div className="p-6">
            <img
              className="bg-gray-300 rounded-lg mx-auto w-[55%]"
              src={pokemonSelected2.data?.sprites[1]}
              alt={pokemonSelected2.data?.name}
            />
          </div>
          <h3 className="text-center capitalize text-lg">
            {pokemonSelected2.data?.name}
          </h3>
          <div className="h-[300px] md:h-[350px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="mx-auto relative"
            >
              <BarChart
                data={formatStats(pokemonSelected2.data)}
                className="pb-10 text-xs md:text-sm lg:text-base"
                margin={{ bottom: 70 }}
              >
                <Bar dataKey="base_stat" fill="#8884d8" />
                <XAxis
                  dataKey="stat"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                />
                <YAxis dataKey="base_stat" domain={[0, 200]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PokemonStatsComparison;
