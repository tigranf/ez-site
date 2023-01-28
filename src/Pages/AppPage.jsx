import { Paper } from "@mui/material";
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
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (user !== null) {
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
    }
  }, [user, selectedGen]);

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
    }
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
