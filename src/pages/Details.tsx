import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { usePokemonAbility, usePokemonSpecies } from "../services/queries";
import { getPokemonAbility } from "../services/api";

interface PokemonProps {
  pokemonDetails: UseQueryResult<
    {
      name: string;
      id: number;
      sprites: string;
      types: string[];
      height: number;
      weight: number;
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
  const pokemonSpecies = usePokemonSpecies(pokemonData?.data.name);
  const pokemonAbility = usePokemonAbility(pokemonData?.data?.ability.url);

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
        <p>Growth Rate: {pokemonSpecies.data?.growth_rate.name}</p>
        <p>
          Pokedex Entry:
          {pokemonSpecies.data?.flavor_text_entries[0].flavor_text}
        </p>
        <ul>
          {pokemonData.data.stats.map((stat) => (
            <li key={stat.stat.url}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
        <p>Ability: {pokemonData.data.ability.name}</p>
        <p>{pokemonAbility.data?.effect_entries[0].effect}</p>
      </div>
    );
  }
};

export default Details;
