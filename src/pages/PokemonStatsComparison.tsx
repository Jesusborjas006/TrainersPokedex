import { useNavigate } from "react-router";

const PokemonStatsComparison = () => {
  const navigate = useNavigate();
  g;
  return (
    <section className="max-w-[1200px] mx-auto">
      <button className="my-6 text-white" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <h1>Stats</h1>
    </section>
  );
};

export default PokemonStatsComparison;
