import Navbar from "./ui/Navbar";
import { usePokemonNames } from "./services/queries";

function App() {
  const { data, isPending, isError } = usePokemonNames();

  if (isPending) return <span>Loading pokemon data...</span>;

  if (isError) return <span>Error fetching data</span>;

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
