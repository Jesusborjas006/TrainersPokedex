import { Link } from "react-router-dom";

interface PokemonProps {
  id: number;
  name: string;
  images: string[];
  types: string[];
  setSelectedPokemon: React.Dispatch<React.SetStateAction<string>>;
}

const Pokemon = ({ name, images, types, setSelectedPokemon }: PokemonProps) => {
  return (
    <div
      className="border cursor-pointer rounded-xl capitalize"
      onClick={() => setSelectedPokemon(name)}
    >
      <Link to={name}>
        <img className="mx-auto" src={images[0]} alt={name} />
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
