import { Link } from "react-router-dom";
import { formattedPokemonId, typeColors } from "../utils/utils";
import { TypeColorTypes } from "../types/pokemon";

interface PokemonProps {
  id: number;
  name: string;
  images: string[];
  types: string[];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<string>>;
}

const Pokemon = ({
  id,
  name,
  images,
  types,
  setSelectedPokemon,
}: PokemonProps) => {
  return (
    <div
      className="border-4 cursor-pointer rounded-xl capitalize bg-slate-100 py-6 hover:border-red-600 relative"
      onClick={() => setSelectedPokemon(name)}
    >
      <button
        className="border absolute top-2 left-2"
        onClick={() => console.log("Cliked")}
      >
        Favorite
      </button>
      <p className="absolute right-2 top-2 text-sm text-blue-900">
        #{formattedPokemonId(String(id))}
      </p>
      <Link to={name}>
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
    </div>
  );
};

export default Pokemon;
