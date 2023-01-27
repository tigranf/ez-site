import { Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import AnimatedPage from "../Components/AnimatedPage";
import PromptBar from "../Components/PromptBar";

const AppPage = () => {
  const [generations, setGenerations] = useState(null);
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
      const fetchData = async () => {
          let res = await fetch("/api/gen/read", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user,
            }),
          });
          res = await res.json();
          setGenerations(res.generations);
      }
      fetchData();
    }
  }, [ user]);

  const handleGen = async (prompt) => {
    let res = await fetch("/api/gen/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        prompt: prompt,
      }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized");
      } else throw new Error("Other error");
    } else {
      res = await res.json();
      console.log(res);
      setGenerations([...generations, res]);
    }
  };

  return (
    <AnimatedPage>
      <PromptBar handleGen={handleGen} />
      {generations && generations.map((gen, i) => <Typography key={i}>{JSON.stringify(gen)}</Typography>) }
    </AnimatedPage>
  );
};

export default AppPage;
