import { useNavigate } from "react-router-dom";
import { usePokemon, usePokemonDetails } from "../services/queries";

const Details = () => {
  const navigate = useNavigate();
  const pokemon = usePokemonDetails();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h2>{}</h2>
    </div>
  );
};

export default Details;
