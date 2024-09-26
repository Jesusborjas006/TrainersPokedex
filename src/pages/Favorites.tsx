import { useNavigate } from "react-router";
import {
  capitalizeString,
  formattedPokemonId,
  typeColors,
} from "../utils/utils";
import { Link } from "react-router-dom";
import { PokemonDetailTypes, TypeColorTypes } from "../types/pokemon";
import ListGrid from "../layouts/ListGrid";
import Card from "../layouts/Card";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "../ui/Navbar";

interface FavoritesProps {
  favorites: [] | PokemonDetailTypes[];
  removeFromFavorites: (pokemonId: number) => void;
}

const Favorites = ({ favorites, removeFromFavorites }: FavoritesProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="max-w-[1250px] mx-auto pt-6 pb-10">
        <Toaster position="top-center" />
        <button
          className="mb-8 text-white px-4 sm:px-6 md:px-10"
          onClick={() => navigate(-1)}
        >
          &larr; Go Back
        </button>
        <h3 className="text-white text-center text-xl sm:text-2xl">
          Favorites
        </h3>
        {favorites.length <= 0 ? (
          <p className="text-white text-center pt-6">
            No favorited Pokemon to display.
          </p>
        ) : (
          <ListGrid>
            {favorites.map((pokemon) => (
              <Card key={pokemon.id}>
                <p className="absolute right-2 top-2 text-sm text-blue-900">
                  #{formattedPokemonId(String(pokemon.id))}
                </p>
                <div className="w-[90px] sm:w-full h-auto mx-auto mt-2">
                  <Link to={`/pokedex/${pokemon.name}`}>
                    <img
                      className="mx-auto bg-gray-300 p-1 border-2 border-white rounded-full hover:bg-green-200"
                      src={pokemon.sprites[0]}
                      alt={pokemon.name}
                    />
                  </Link>
                </div>
                <h3 className="font-medium hover:underline hover:text-blue-700 inline-block md:text-lg">
                  <Link to={`/pokedex/${pokemon.name}`}>{pokemon.name}</Link>
                </h3>
                <div className="flex justify-center gap-x-1 mt-2 text-white">
                  {pokemon.types.map((type) => (
                    <p
                      className="py-[2px] rounded-[4px] inline-block text-sm w-[65px] md:w-[75px]"
                      style={{
                        backgroundColor:
                          typeColors[type as keyof TypeColorTypes],
                      }}
                      key={type}
                    >
                      {type}
                    </p>
                  ))}
                </div>
                <button
                  onClick={() => {
                    toast.error(
                      `${capitalizeString(pokemon.name)} has been removed.`
                    );
                    removeFromFavorites(pokemon.id);
                  }}
                  className="border relative top-4 px-2 py-1 bg-red-700 text-white hover:bg-red-500 text-sm rounded-md"
                >
                  Remove
                </button>
              </Card>
            ))}
          </ListGrid>
        )}
      </section>
    </>
  );
};

export default Favorites;
