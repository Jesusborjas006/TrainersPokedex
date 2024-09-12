import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getPokemonDetails } from "../services/api";
import { useState } from "react";
import StatsBar from "../components/StatsBar";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const PokemonStatsComparison = () => {
  const [pokemonComparison1, setPokemonComparison1] = useState("rayquaza");
  const [pokemonComparison2, setPokemonComparison2] = useState("groudon");
  const { data, status } = useQuery({
    queryKey: ["comparisons", pokemonComparison1],
    queryFn: () => getPokemonDetails(pokemonComparison1),
  });
  const navigate = useNavigate();
  const formattedStats = data?.stats.map((stat) => {
    return {
      ...stat,
      stat: stat.stat.name,
    };
  });

  if (status === "pending") return <span>Loading...</span>;

  if (status === "error") return <span>Error</span>;

  return (
    <section className="max-w-[1200px] mx-auto">
      <button className="my-6 text-white" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <div className="flex justify-around ">
        <div className="border bg-white w-[40%] rounded-xl">
          <div className="p-6">
            <img
              className="bg-gray-300 rounded-lg"
              src={data.sprites[1]}
              alt={data.name}
            />
          </div>
          <h3 className="text-center capitalize text-lg">{data.name}</h3>
          <div className="h-[400px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className="mx-auto relative"
            >
              <BarChart
                data={formattedStats}
                className="pb-10 text-xs md:text-sm lg:text-base"
              >
                <Bar dataKey="base_stat" fill="#8884d8" />
                <XAxis dataKey="stat" interval={0} />
                <YAxis dataKey="base_stat" domain={[0, 200]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border">
          <h3>Charizard</h3>
          <p>Stats</p>
        </div>
      </div>
    </section>
  );
};

export default PokemonStatsComparison;
