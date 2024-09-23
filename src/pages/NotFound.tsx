import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section>
      <div className="bg-white text-center">
        <h3 className="text-6xl font-semibold">404</h3>
        <h4 className="text-2xl">Page Not Found</h4>
        <p>
          The Page you are looking for doesn't exist or an other error occurred.
        </p>
        <p>
          Go back, or head over to
          <Link to="/pokedex">http://localhost:5173/pokedex</Link>
        </p>
      </div>
    </section>
  );
};

export default NotFound;
