import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import AnimatedPage from "../Components/AnimatedPage";

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
    <AnimatedPage>
      <h1>
        USER:
        <br /> {JSON.stringify(user)}
      </h1>
      <h1>
        GENS:
        <br /> {JSON.stringify({ gens: [] })}
      </h1>
    </AnimatedPage>
  );
};

export default AppPage;
