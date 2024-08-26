interface PokemonProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const Pokemon = ({ id, name, image, types }: PokemonProps) => {
  return (
    <div className="border cursor-pointer rounded-xl capitalize">
      <img className="mx-auto" src={image} alt={name} />
      <p>{name}</p>
      <div className="flex justify-center gap-x-2">
        {types.map((type) => (
          <p key={type}>{type}</p>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
