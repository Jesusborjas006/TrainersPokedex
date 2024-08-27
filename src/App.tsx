import Navbar from "./ui/Navbar";
import PokemonList from "./components/PokemonList";
import { Routes, Route } from "react-router";
import Details from "./pages/Details";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/:pokemon" element={<Details />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
