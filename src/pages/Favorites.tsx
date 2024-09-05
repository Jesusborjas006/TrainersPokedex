import { useNavigate } from "react-router";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { Link } from "react-router-dom";
import { TypeColorTypes } from "../types/pokemon";
import ListGrid from "../layouts/ListGrid";
import Card from "../layouts/Card";

interface FavoritesProps {
  favorites: never[];
}

const Favorites = ({ favorites }: FavoritesProps) => {
  console.log(favorites.length);
  const navigate = useNavigate();

  return (
    <section className="max-w-[1200px] mx-auto">
      <button className="my-6 text-white" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <h3 className="text-white text-center text-2xl">Favorites</h3>
      {favorites.length <= 0 ? (
        <p className="text-white text-center">
          There's no pokemon that are favorited
        </p>
      ) : (
        <ListGrid>
          {favorites.map((pokemon) => (
            <Card key={pokemon.data.id}>
              <p className="absolute right-2 top-2 text-sm text-blue-900">
                #{formattedPokemonId(String(pokemon.data.id))}
              </p>
              <Link to={`../${pokemon.data.name}`}>
                <div className="w-[120px] h-auto mx-auto">
                  <img
                    className="mx-auto bg-gray-300 rounded-full p-2"
                    src={pokemon.data.sprites[0]}
                    alt={pokemon.data.name}
                  />
                </div>
                <h3 className="text-lg font-medium">{pokemon.data.name}</h3>
                <div className="flex justify-center gap-x-2 mt-2 text-white">
                  {pokemon.data.types.map((type) => (
                    <p
                      style={{
                        backgroundColor:
                          typeColors[type as keyof TypeColorTypes],
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
              </Link>
            </Card>
          ))}
        </ListGrid>
      )}
    </section>
  );
};

export default Favorites;
