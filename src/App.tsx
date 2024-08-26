import { useQuery } from "@tanstack/react-query";
import Navbar from "./ui/Navbar";
import { getPokemon } from "./services/api";

function App() {
  const { data, status } = useQuery({
    queryKey: ["pokemon"],
    queryFn: getPokemon,
  });

  if (status === "pending") return <span>Loading Data..</span>;

  if (status === "error") return <span>An error has occurred</span>;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <ul>
          {data.results.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
