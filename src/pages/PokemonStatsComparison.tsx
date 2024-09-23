import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getPokemonDetails } from "../services/api";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { formattedPokemonId } from "../utils/utils";
import Navbar from "../ui/Navbar";

const PokemonStatsComparison = () => {
  const navigate = useNavigate();
  const [pokemonComparison1, setPokemonComparison1] = useState("");
  const [pokemonComparison2, setPokemonComparison2] = useState("");
  const firstPokemon = useQuery({
    queryKey: ["comparisons", pokemonComparison1],
    queryFn: () => getPokemonDetails(pokemonComparison1),
    enabled: pokemonComparison1 !== "",
  });

  const secondPokemon = useQuery({
    queryKey: ["comparisons", pokemonComparison2],
    queryFn: () => getPokemonDetails(pokemonComparison2),
    enabled: pokemonComparison2 !== "",
  });

  const formatStats = (pokemonStats) => {
    const formattedStats = pokemonStats?.stats.map((stat) => {
      return {
        ...stat,
        stat: stat.stat.name,
      };
    });
    return formattedStats;
  };

  let firstPokemonStatusContent;
  if (firstPokemon.isLoading) {
    firstPokemonStatusContent = <p>Getting Pokemon Info...</p>;
  } else if (firstPokemon.error) {
    firstPokemonStatusContent = (
      <p>Trouble getting data. Make sure the Name or ID are correct!</p>
    );
  } else {
    firstPokemonStatusContent = (
      <p>
        No data to display. <br />
        Please fill the form to see Pokemon's stats.
      </p>
    );
  }

  let secondPokemonStatusContent;
  if (secondPokemon.isLoading) {
    secondPokemonStatusContent = <p>Getting Pokemon Info...</p>;
  } else if (secondPokemon.error) {
    secondPokemonStatusContent = (
      <p>Trouble getting data. Make sure the Name or ID are correct!</p>
    );
  } else {
    secondPokemonStatusContent = (
      <p>
        No data to display. <br />
        Please fill the form to see Pokemon's stats.
      </p>
    );
  }

  return (
    <>
      <header>{<Navbar />}</header>
      <section className="max-w-[1250px] mx-auto px-4 ">
        <button className="my-6 text-white" onClick={() => navigate(-1)}>
          &larr; Go Back
        </button>
        <div className="flex justify-around py-6 gap-x-10">
          <div>
            <label className="text-white">Name or ID:</label>
            <input
              className="border pl-1 ml-1"
              type="text"
              placeholder="Search Pokemon..."
              value={pokemonComparison1}
              onChange={(e) => setPokemonComparison1(e.target.value)}
            />
          </div>
          <div>
            <label className="text-white">Name or ID:</label>
            <input
              className="border pl-1 ml-1"
              type="text"
              placeholder="Search Pokemon..."
              value={pokemonComparison2}
              onChange={(e) => setPokemonComparison2(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-10 gap-x-10 md:flex-row md:space-y-0">
          {firstPokemon.status === "success" ? (
            <>
              <div className="bg-white rounded-xl flex-1 ">
                <div className="p-6">
                  <img
                    className="bg-gray-300 rounded-lg mx-auto w-[40%] p-4"
                    src={firstPokemon.data.sprites[1]}
                    alt={firstPokemon.data.name}
                  />
                </div>
                <h3 className="text-center capitalize text-xl font-medium pb-4">
                  {firstPokemon.data.name}
                  <span className=" font-light">
                    {" "}
                    | #{formattedPokemonId(String(firstPokemon.data.id))}
                  </span>
                </h3>
                <div className="h-[300px] md:h-[350px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    className="mx-auto relative"
                  >
                    <BarChart
                      data={formatStats(firstPokemon.data)}
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
            </>
          ) : (
            <div className="bg-white rounded-xl flex-1 h-full">
              <div className="flex flex-col justify-center text-center p-10">
                {firstPokemonStatusContent}
              </div>
            </div>
          )}
          {secondPokemon.status === "success" ? (
            <>
              <div className="bg-white rounded-xl flex-1">
                <div className="p-6">
                  <img
                    className="bg-gray-300 rounded-lg mx-auto w-[40%] p-4"
                    src={secondPokemon.data.sprites[1]}
                    alt={secondPokemon.data.name}
                  />
                </div>
                <h3 className="text-center capitalize text-xl font-medium pb-4">
                  {secondPokemon.data.name}
                  <span className=" font-light">
                    {" "}
                    | #{formattedPokemonId(String(secondPokemon.data.id))}
                  </span>
                </h3>
                <div className="h-[300px] md:h-[350px]">
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    className="mx-auto relative"
                  >
                    <BarChart
                      data={formatStats(secondPokemon.data)}
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
            </>
          ) : (
            <div className="bg-white rounded-xl flex-1 h-full">
              <div className="flex flex-col justify-center text-center p-10">
                {secondPokemonStatusContent}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PokemonStatsComparison;
