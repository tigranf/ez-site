import { Paper, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import AnimatedPage from "../Components/AnimatedPage";
import Generation from "../Components/Generation";
import PromptBar from "../Components/PromptBar";
import ResponsiveDrawer from "../Components/ResponsiveDrawer";

const AppPage = () => {
  const [generations, setGenerations] = useState(null);
  const [selectedGen, setSelectedGen] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user !== null) {
      setIsLoading(true);
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
      };
      fetchData();
      setIsLoading(false);
    }
  }, [user, selectedGen]);

  const handleGen = async (prompt) => {
    setIsLoading(true);
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
    }
    setIsLoading(false);
    setSelectedGen(res.generation.id);
    
  };

  let content;
  if (selectedGen === 0) {
    content = (
      <Paper variant="outlined" sx={{ mx: 4, my: 6 }}>
        <PromptBar handleGen={handleGen} />
      </Paper>
    );
  } else
    content = (
      <Generation selectedGen={selectedGen} generations={generations} />
    );

  if (isLoading) content = <Typography variant="h1">Loading...</Typography>;
  return (
    <AnimatedPage>
      <ResponsiveDrawer
        generations={generations}
        setSelectedGen={(gen) => setSelectedGen(gen)}
      >
        {content}
      </ResponsiveDrawer>
    </AnimatedPage>
  );
};

export default AppPage;
