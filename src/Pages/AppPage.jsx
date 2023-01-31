import { WebAsset } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  LinearProgress,
  Paper,
  Zoom,
} from "@mui/material";
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
      enqueueSnackbar("Powered by OpenAI", {
        variant: "warning",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Zoom,
        persist: true,
        // action: <SmartToy color="inherit" />,
        action: (
          <IconButton
            color="success"
            onClick={() =>
              window.open(
                "https://platform.openai.com/overview",
                "_blank",
                "noreferrer"
              )
            }
          >
            <svg
              data-name="OpenAI Logo"
              width="24px"
              height="24px"
              viewBox="140 140 520 520"
            >
              <defs>
                <linearGradient id="linear" x1="100%" y1="22%" x2="0%" y2="78%">
                  <stop offset="0%" stopColor="rgb(131,211,231)"></stop>
                  <stop offset="2%" stopColor="rgb(127,203,229)"></stop>
                  <stop offset="25%" stopColor="rgb(86,115,217)"></stop>
                  <stop offset="49%" stopColor="rgb(105,80,190)"></stop>
                  <stop offset="98%" stopColor="rgb(197,59,119)"></stop>
                  <stop offset="100%" stopColor="rgb(197,59,119)"></stop>
                </linearGradient>
              </defs>
              <path
                id="logo"
                d="m617.24 354a126.36 126.36 0 0 0 -10.86-103.79 127.8 127.8 0 0 0 -137.65-61.32 126.36 126.36 0 0 0 -95.31-42.49 127.81 127.81 0 0 0 -121.92 88.49 126.4 126.4 0 0 0 -84.5 61.3 127.82 127.82 0 0 0 15.72 149.86 126.36 126.36 0 0 0 10.86 103.79 127.81 127.81 0 0 0 137.65 61.32 126.36 126.36 0 0 0 95.31 42.49 127.81 127.81 0 0 0 121.96-88.54 126.4 126.4 0 0 0 84.5-61.3 127.82 127.82 0 0 0 -15.76-149.81zm-190.66 266.49a94.79 94.79 0 0 1 -60.85-22c.77-.42 2.12-1.16 3-1.7l101-58.34a16.42 16.42 0 0 0 8.3-14.37v-142.39l42.69 24.65a1.52 1.52 0 0 1 .83 1.17v117.92a95.18 95.18 0 0 1 -94.97 95.06zm-204.24-87.23a94.74 94.74 0 0 1 -11.34-63.7c.75.45 2.06 1.25 3 1.79l101 58.34a16.44 16.44 0 0 0 16.59 0l123.31-71.2v49.3a1.53 1.53 0 0 1 -.61 1.31l-102.1 58.95a95.16 95.16 0 0 1 -129.85-34.79zm-26.57-220.49a94.71 94.71 0 0 1 49.48-41.68c0 .87-.05 2.41-.05 3.48v116.68a16.41 16.41 0 0 0 8.29 14.36l123.31 71.19-42.69 24.65a1.53 1.53 0 0 1 -1.44.13l-102.11-59a95.16 95.16 0 0 1 -34.79-129.81zm350.74 81.62-123.31-71.2 42.69-24.64a1.53 1.53 0 0 1 1.44-.13l102.11 58.95a95.08 95.08 0 0 1 -14.69 171.55c0-.88 0-2.42 0-3.49v-116.68a16.4 16.4 0 0 0 -8.24-14.36zm42.49-63.95c-.75-.46-2.06-1.25-3-1.79l-101-58.34a16.46 16.46 0 0 0 -16.59 0l-123.31 71.2v-49.3a1.53 1.53 0 0 1 .61-1.31l102.1-58.9a95.07 95.07 0 0 1 141.19 98.44zm-267.11 87.87-42.7-24.65a1.52 1.52 0 0 1 -.83-1.17v-117.92a95.07 95.07 0 0 1 155.9-73c-.77.42-2.11 1.16-3 1.7l-101 58.34a16.41 16.41 0 0 0 -8.3 14.36zm23.19-50 54.92-31.72 54.92 31.7v63.42l-54.92 31.7-54.92-31.7z"
                fill="#202123"
              ></path>
            </svg>
          </IconButton>
        ),
      });
    }, 5200);
    setTimeout(() => {
      enqueueSnackbar("Almost there...", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Zoom,
        persist: true,
        action: <WebAsset sx={{mr:1}} color="inherit" />,
      });
    }, 10400);
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
