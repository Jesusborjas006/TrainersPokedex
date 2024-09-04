import { useNavigate } from "react-router";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { Link } from "react-router-dom";
import { TypeColorTypes } from "../types/pokemon";

interface FavoritesProps {
  favorites: never[];
}

const Favorites = ({ favorites }: FavoritesProps) => {
  console.log(favorites[0].data);
  const navigate = useNavigate();
  return (
    <section className="max-w-[1200px] mx-auto">
      <button className="my-6 text-white" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <h3>Favorites</h3>
      <div className="grid grid-cols-3 gap-8 pt-10 text-center max-w-[1200px] mx-auto">
        {favorites.map((pokemon) => (
          <div
            key={pokemon.data.id}
            className="border-4 cursor-pointer rounded-xl capitalize bg-slate-100 py-6 hover:border-red-600 relative"
          >
            <h3 className="text-lg font-medium">{pokemon.data.name}</h3>
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
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Favorites;
