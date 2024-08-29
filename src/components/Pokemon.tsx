import { Link } from "react-router-dom";
import { formattedPokemonId } from "../utils/utils";

interface PokemonProps {
  id: number;
  name: string;
  images: string[];
  types: string[];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<string>>;
}

const typeColors = {
  grass: "#78C850",
  fire: "#F08030",
  water: "#6890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  poison: "#A040A0",
  electric: "#F8D030",
  ground: "#E0C068",
  fairy: "#EE99AC",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  flying: "#A890F0",
};

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
                backgroundColor: typeColors[type],
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
