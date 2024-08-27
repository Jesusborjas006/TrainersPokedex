import { useNavigate } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default Details;
