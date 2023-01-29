import { useContext, useEffect, useState } from "react";
import PasswordInput from "../Components/PasswordInput";
import UsernameInput from "../Components/UsernameInput";
import { UserContext } from "../App";
import { Typography, Stack, Button, Paper, Box, Zoom } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "../Components/AnimatedPage";
import { useSnackbar } from "notistack";

let unavailableNames = ["admin", "test", "moderator", "user", "tigran"];

const Login = () => {
  const [clear, setClear] = useState(false);
  const [invalid, setInvalid] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate("/app");
  }, [navigate, user]);

  useEffect(() => {
    if (
      (password.length > 0 &&
        (password.length < 8 ||
          !/\d/.test(password) ||
          !/[A-Z]/.test(password))) ||
      (username.length > 0 &&
        unavailableNames.some((name) => name === username))
    )
      setInvalid(true);
    else if (password.length > 0 && username.length > 0) setInvalid(false);
  }, [password, username]);

  const handleClear = () => {
    setClear(true);
    setTimeout(() => {
      setClear(false);
    }, 0);
  };

  const handleAuthLogin = async (username, password) => {
    let res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (!res.ok) {
      if (res.status === 401) {
        enqueueSnackbar(
          "Incorrect username and/or password. Please try again.",
          {
            variant: "error",
            anchorOrigin: { horizontal: "center", vertical: "top" },
            TransitionComponent: Zoom,
          }
        );
      } else throw new Error("Other error");
    } else {
      res = await res.json();
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/app");
    }
  };

  return (
    <AnimatedPage>
      <Paper
        elevation={4}
        sx={{
          py: 8,
          px: 4,
          maxWidth: 650,
          width: "100%",
          height: "100%",
          mx: "auto",
          my: 12,
        }}
      >
        <Typography variant="h4" component="div" textAlign={"center"}>
          Welcome back!
        </Typography>
        <Typography textAlign={"center"} mt={0.5} mb={2} color="GrayText">
          Fill in the information below to continue.
        </Typography>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (!invalid) {
              handleAuthLogin(username, password);
            }
          }}
        >
          <Stack spacing={2} width={"65%"} mx={"auto"}>
            <UsernameInput
              clearClick={clear}
              handleUsername={(username) => setUsername(username)}
            />
            <PasswordInput
              clearClick={clear}
              handlePassword={(password) => setPassword(password)}
            />
            <Box sx={{ display: "flex", gap: 2, flexDirection: "row-reverse" }}>
              <Button
                size="lg"
                variant="text"
                fullWidth
                type="submit"
                color="secondary"
                disabled={invalid}
              >
                Log In
              </Button>
              <Button
                size="lg"
                variant="text"
                fullWidth
                type="button"
                color="error"
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>
            <Box>
              <Typography>
                Don't have an account?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Button variant="text" size="small">Click here</Button>
                </Link>{" "}
                to create one.
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>
    </AnimatedPage>
  );
};

export default Login;
