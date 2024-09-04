import { useNavigate } from "react-router";

const Favorites = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1200px] mx-auto">
      <button className="my-6 text-white" onClick={() => navigate(-1)}>
        &larr; Go Back
      </button>
      <h3>Favorites</h3>
      <div></div>
    </section>
  );
};

export default Favorites;
