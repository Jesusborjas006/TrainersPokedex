import { UseQueryResult } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface PokemonProps {
  pokemonDetails: UseQueryResult<
    {
      name: string;
      id: number;
      sprites: string;
      types: string[];
      height: number;
      weight: number;
    },
    Error
  >[];
}

const Details = ({ pokemonDetails }: PokemonProps) => {
  const navigate = useNavigate();
  const pokemonEndpoint = useParams();

  const pokemonData = pokemonDetails.find(
    (pokemon) => pokemon.data?.name === pokemonEndpoint.pokemon
  );

  console.log(pokemonData?.data);

  if (!pokemonData)
    return (
      <p className="capitalize">Loading {pokemonEndpoint.pokemon} data...</p>
    );

  if (pokemonData.data) {
    return (
      <div>
        <button onClick={() => navigate(-1)}>Go Back</button>
        <h2>{pokemonData.data.name}</h2>
        <img src={pokemonData.data.sprites} alt={pokemonData.data.name} />
        <ul>
          {pokemonData.data.types.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
        <p>Height: {pokemonData.data.height}</p>
        <p>Weight: {pokemonData.data.weight}</p>
      </div>
    );
  }
};

export default Details;
