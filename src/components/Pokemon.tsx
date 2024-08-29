import { Link } from "react-router-dom";
import { formattedPokemonId } from "../utils/utils";

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
      className="border cursor-pointer rounded-xl capitalize bg-slate-100 py-6"
      onClick={() => setSelectedPokemon(name)}
    >
      <Link to={name}>
        <div className="w-[120px] h-auto mx-auto">
          <img
            className="mx-auto bg-gray-300 rounded-full p-2"
            src={images[0]}
            alt={name}
          />
        </div>
        <p>#{formattedPokemonId(String(id))}</p>
        <p>{name}</p>
        <div className="flex justify-center gap-x-2">
          {types.map((type) => (
            <p key={type}>{type}</p>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Pokemon;
