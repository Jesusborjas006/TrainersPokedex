import { Link } from "react-router-dom";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { TypeColorTypes } from "../types/pokemon";
import Card from "../layouts/Card";
import { useState } from "react";

interface PokemonProps {
  id: number;
  name: string;
  images: string[];
  types: string[];
  addToFavorites: (pokemonId: number) => void;
}

const Pokemon = ({ id, name, images, types, addToFavorites }: PokemonProps) => {
  const [activeStar, setActiveStar] = useState(false);
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setActiveStar(true);
    addToFavorites(id);
  };

  return (
    <Card>
      <Link to={`${name}`}>
        <button
          className="absolute top-2 left-2 text-4xl hover:text-yellow-500 "
          onClick={handleClick}
        >
          {activeStar ? (
            <span className="text-yellow-400">★</span>
          ) : (
            <span>☆</span>
          )}
        </button>
        <p className="absolute right-2 top-2 text-sm text-blue-900">
          #{formattedPokemonId(String(id))}
        </p>
        <div className="w-[120px] h-auto mx-auto">
          <img
            className="mx-auto bg-gray-300 rounded-full p-2"
            src={images[0]}
            alt={name}
          />
        </div>
        <h3 className="text-lg font-medium">{name}</h3>
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
      </Link>
    </Card>
  );
};

export default Pokemon;
