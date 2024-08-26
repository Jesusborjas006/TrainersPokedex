interface PokemonProps {
  id: number;
  name: string;
  image: string;
  types: string[];
}

const Pokemon = ({ id, name, image, types }: PokemonProps) => {
  return (
    <div className="border cursor-pointer rounded-xl">
      <img className="mx-auto" src={image} alt={name} />
      <p>{name}</p>
      {types.map((type) => (
        <p key={type}>{type}</p>
      ))}
    </div>
  );
};

export default Pokemon;
