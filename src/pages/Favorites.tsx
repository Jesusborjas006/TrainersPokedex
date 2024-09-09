import { useNavigate } from "react-router";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { Link } from "react-router-dom";
import { TypeColorTypes } from "../types/pokemon";
import ListGrid from "../layouts/ListGrid";
import Card from "../layouts/Card";

interface FavoritesProps {
  favorites: never[];
  removeFromFavorites: (pokemonId: number) => void;
}

const Favorites = ({ favorites, removeFromFavorites }: FavoritesProps) => {
  const navigate = useNavigate();

  return (
    <section className="max-w-[1200px] mx-auto">
      <button className="my-6 text-white" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <h3 className="text-white text-center text-2xl">Favorites</h3>
      {favorites.length <= 0 ? (
        <p className="text-white text-center pt-10">
          No favorited Pokemon to display.
        </p>
      ) : (
        <ListGrid>
          {favorites.map((pokemon) => (
            <Card key={pokemon.id}>
              <p className="absolute right-2 top-2 text-sm text-blue-900">
                #{formattedPokemonId(String(pokemon.id))}
              </p>
              <div className="w-[120px] h-auto mx-auto">
                <Link to={`../${pokemon.name}`}>
                  <img
                    className="mx-auto bg-gray-300 p-2 border-2 border-white rounded-full hover:bg-green-200"
                    src={pokemon.sprites[0]}
                    alt={pokemon.name}
                  />
                </Link>
              </div>
              <h3 className="text-lg font-medium hover:underline hover:text-blue-700 inline-block">
                <Link to={`../${pokemon.name}`}>{pokemon.name}</Link>
              </h3>
              <div className="flex justify-center gap-x-2 mt-2 text-white">
                {pokemon.types.map((type) => (
                  <p
                    style={{
                      backgroundColor: typeColors[type as keyof TypeColorTypes],
                      padding: "2px 0",
                      borderRadius: "4px",
                      display: "inline-block",
                      fontSize: "14px",
                      width: "70px",
                    }}
                    key={type}
                  >
                    {type}
                  </p>
                ))}
              </div>
              <button
                onClick={() => removeFromFavorites(pokemon.id)}
                className="border relative top-4 px-2 py-1 bg-red-700 text-white hover:bg-red-500 text-sm rounded-mg"
              >
                Remove
              </button>
            </Card>
          ))}
        </ListGrid>
      )}
    </section>
  );
};

export default Favorites;
