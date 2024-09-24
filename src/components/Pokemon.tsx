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
    starContent = <span className="text-yellow-400 cursor-default">★</span>;
  } else {
    starContent = <span>☆</span>;
  }

  return (
    <Card>
      <button
        className="absolute top-0 left-1 text-3xl md:text-4xl hover:text-yellow-500"
        onClick={() => addToFavorites(id)}
      >
        {starContent}
      </button>
      <p className="absolute right-2 top-2 text-sm text-blue-900">
        #{formattedPokemonId(String(id))}
      </p>
      <div className="min-w-[80px] w-[65%] h-auto mx-auto mt-2">
        <Link to={name}>
          <img
            className="mx-auto bg-gray-300 p-1 border-2 border-white rounded-full hover:bg-green-200"
            src={images[0]}
            alt={name}
          />
        </Link>
      </div>
      <h3 className="font-medium hover:underline hover:text-blue-700 inline-block md:text-lg">
        <Link to={name}>{name}</Link>
      </h3>
      <div className="flex justify-center gap-x-1 md:gap-x-2 mt-2 text-white">
        {types.map((type) => (
          <p
            style={{
              backgroundColor: typeColors[type as keyof TypeColorTypes],
            }}
            className="py-[2px] rounded-[4px] inline-block text-sm w-[65px] md:w-[75px]"
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
