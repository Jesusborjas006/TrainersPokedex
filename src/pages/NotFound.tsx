import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPokemonInfo } from "../services/api";
import LoadingSpinner from "../ui/LoadingSpinner";

const NotFound = () => {
  const { data, isPending } = useQuery({
    queryKey: ["pokemon", "mimikyu-disguised", "pokemonDetails"],
    queryFn: () => getPokemonInfo("mimikyu-disguised"),
  });

  if (isPending) return <LoadingSpinner />;

  return (
    <section className="border border-red-500 flex items-center justify-center h-screen text-center">
      <div className="bg-white p-10 rounded-lg">
        <img
          className="w-1/2 mx-auto"
          src={data?.sprites[1]}
          alt={data?.name}
        />
        <h3 className="text-7xl font-semibold">404</h3>
        <h4 className="text-3xl">Page Not Found</h4>
        <p className="pt-4">
          The Page you're looking for doesn't exist or an other error occurred.
        </p>
        <p>
          Head over to this link
          <Link to="/pokedex" className="text-blue-700 underline">
            {" "}
            http://localhost:5173/pokedex
          </Link>{" "}
          to go back!
        </p>
      </div>
    </section>
  );
};

export default NotFound;
