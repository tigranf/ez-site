import { SmartToy, WebAsset } from "@mui/icons-material";
import { CircularProgress, LinearProgress, Paper, Zoom } from "@mui/material";
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
  }, [user, selectedGen]);

  const handleGen = async (prompt) => {
    setIsLoading(true);
    enqueueSnackbar("Generating web site. Please wait.", {
      variant: "info",
      anchorOrigin: { horizontal: "center", vertical: "top" },
      TransitionComponent: Zoom,
      persist: true,
      action: <CircularProgress sx={{ p: 1 }} color="inherit" />,
    });
    setTimeout(() => {
      enqueueSnackbar("Powered by openAI", {
        variant: "warning",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Zoom,
        persist: true,
        action: <SmartToy color="inherit" />,
      });
    }, 5200);
    setTimeout(() => {
      enqueueSnackbar("Almost there...", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Zoom,
        persist: true,
        action: <WebAsset color="inherit" />,
      });
    }, 15400);
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
      setGenerations([...generations, res.generation]);
    }
    setIsLoading(false);
    closeSnackbar();
    setSelectedGen(res.generation.id);
  };

  let content;
  if (selectedGen === 0) {
    content = (
      <Paper
        elevation={0}
        sx={{
          mx: "auto",
          mt: 3,
          py: 2,
          px: 2,
          maxWidth: 770,
        }}
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
        selectedGen={selectedGen}
        setSelectedGen={(gen) => setSelectedGen(gen)}
        isLoading={isLoading}
      >
        {isLoading && <LinearProgress color="info" />}
        {content}
      </ResponsiveDrawer>
    </AnimatedPage>
  );
};

export default AppPage;
