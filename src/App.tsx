import { useQuery } from "@tanstack/react-query";
import Navbar from "./ui/Navbar";
import { getPokemonId } from "./services/api";

function App() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemonId,
  });

  if (isPending) return <span>Loading pokemon data...</span>;

  if (isError) return <span>Error fetching data</span>;

  console.log(data);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {data.results.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </main>
    </>
  );
}

export default App;
