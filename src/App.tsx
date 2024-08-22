import { useQuery } from "@tanstack/react-query";
import Navbar from "./ui/Navbar";
import { getPokemonNames } from "./services/api";

function App() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemonNames,
  });

  console.log(data);

  // const pokemons = useQueries({
  //   queries: (data?.results ?? []).map((pokemon) => {
  //     return {
  //       queryKey: ["pokemons", pokemon.name],
  //       queryFn: () => getPokemon(pokemon.name),
  //     };
  //   }),
  // });

  if (isPending) return <span>Loading pokemon data...</span>;

  if (isError) return <span>Error fetching data</span>;

  // console.log(pokemons);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {/* <ul>
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul> */}
      </main>
    </>
  );
}

export default App;
