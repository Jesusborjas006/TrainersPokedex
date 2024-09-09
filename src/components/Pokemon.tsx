import { Link } from "react-router-dom";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { TypeColorTypes } from "../types/pokemon";
import Card from "../layouts/Card";

interface PokemonProps {
  id: number;
  name: string;
  images: string[];
  types: string[];
  addToFavorites: (pokemonId: number) => void;
  favorites: {
    name: string;
    id: number;
    sprites: string[];
    types: string[];
    weight: number;
    height: number;
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      };
    }[];
    ability: {
      name: string;
      url: string;
    };
  }[];
}

const Pokemon = ({
  id,
  name,
  images,
  types,
  addToFavorites,
  favorites,
}: PokemonProps) => {
  const favoritedPokemonNames = favorites.map((pokemon) => pokemon.name);
  let starContent;
  if (favoritedPokemonNames.includes(name)) {
    starContent = <span className="text-yellow-400">★</span>;
  } else {
    starContent = <span>☆</span>;
  }

  return (
    <Card>
      <button
        className="absolute top-2 left-2 text-4xl hover:text-yellow-500"
        onClick={() => addToFavorites(id)}
      >
        {starContent}
      </button>
      <p className="absolute right-2 top-2 text-sm text-blue-900">
        #{formattedPokemonId(String(id))}
      </p>
      <div className="w-[120px] h-auto mx-auto">
        <Link to={name}>
          <img
            className="mx-auto bg-gray-300 p-2 border-2 border-white rounded-full"
            src={images[0]}
            alt={name}
          />
        </Link>
      </div>
      <h3 className="text-lg font-medium hover:underline hover:text-blue-700 inline-block">
        <Link to={name}>{name}</Link>
      </h3>
      <div className="flex justify-center gap-x-2 mt-2 text-white">
        {types.map((type) => (
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
    </Card>
  );
};

export default Pokemon;
