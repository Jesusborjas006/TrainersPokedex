import Navbar from "./ui/Navbar";
import { usePokemonNames } from "./services/queries";
import { useQueries } from "@tanstack/react-query";
import { getPokemon } from "./services/api";

function App() {
  const { data, isPending, isError } = usePokemonNames();

  const pokemonDetails = useQueries({
    queries: (data ?? [])?.map((pokemon) => {
      return {
        queryKey: ["pokemon", pokemon],
        queryFn: () => getPokemon(pokemon),
      };
    }),
  });

  if (isPending) return <span>Loading pokemon data...</span>;

  if (isError) return <span>Error fetching data</span>;

  console.log(pokemonDetails);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <ul>
          {data.map((pokemon) => (
            <li key={pokemon}>{pokemon}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
