import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <PokemonList />
      </main>
    </>
  );
}

export default App;
