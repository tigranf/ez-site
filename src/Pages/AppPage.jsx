import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const AppPage = () => {
//   const [generations, setGenerations] = useState(null);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user !== null) {
      // TODO: fetch user generations
    }
  }, [user]);

  return (
    <>
      <div>USER:<br /> {JSON.stringify(user)}</div>
      <div>GENS:<br /> {JSON.stringify({ gens: [] })}</div>
    </>
  );
};

export default AppPage;
