import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h3>404</h3>
      <h4>Page Not Found</h4>
      <p>
        The Page you are looking for doesn't exist or an other error occurred.
      </p>
      <p>
        Go back, or head over to
        <Link to="/pokedex">http://localhost:5173/pokedex</Link>
      </p>
    </div>
  );
};

export default NotFound;
