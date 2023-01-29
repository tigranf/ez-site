import { Paper, Zoom } from "@mui/material";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import AnimatedPage from "../Components/AnimatedPage";
import Generation from "../Components/Generation";
import GenSkeleton from "../Components/GenSkeleton";
import PromptBar from "../Components/PromptBar";
import ResponsiveDrawer from "../Components/ResponsiveDrawer";

const AppPage = () => {
  const [generations, setGenerations] = useState(null);
  const [selectedGen, setSelectedGen] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
  }, [user, selectedGen, enqueueSnackbar, closeSnackbar]);

  const handleGen = async (prompt) => {
    setIsLoading(true);
    enqueueSnackbar("Generating web site. Please wait.", {
      variant: "info",
      anchorOrigin: { horizontal: "center", vertical: "top" },
      TransitionComponent: Zoom,
      persist: true,
    });
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
    closeSnackbar();
  };

  let content;
  if (selectedGen === 0) {
    content = (
      <Paper
        variant="outlined"
        // elevation={24}
        sx={{ mx: "auto", my: 0, py: 2, px: 3, maxWidth: 900, minHeight:"calc(100vh - 48px)" }}
      >
        <PromptBar handleGen={handleGen} />
      </Paper>
    );
  } else
    content = (
      <Generation selectedGen={selectedGen} generations={generations} />
    );

  if (isLoading) content = <GenSkeleton />;
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
