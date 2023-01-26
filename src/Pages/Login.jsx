import { useContext, useState } from "react";
import PasswordInput from "../Components/PasswordInput";
import UsernameInput from "../Components/UsernameInput";
import { UserContext } from "../App";
import { Typography, Stack, Button, Paper, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [clear, setClear] = useState(false);
  const [invalid, setInvalid] = useState(true);
  console.log("🚀 ~ file: Login.jsx:11 ~ Login ~ invalid", invalid)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

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
      if (res.status === 401) console.log("Unauthorized");
      else throw new Error("Other error");
    } else {
      res = await res.json();
      console.log(res);
      setUser(res.user);
      navigate("/app");
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        py: 8,
        px: 4,
        maxWidth: 600,
        width: "100%",
        height: "100%",
        mx: "auto",
        mt: 12,
      }}
    >
      <Typography variant="h4" component="div" textAlign={"center"}>
        Log In Form
      </Typography>
      <Typography textAlign={"center"} mt={0.5} mb={2} color="GrayText">
        Fill in the information below.
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAuthLogin(username, password);
        }}
      >
        <Stack spacing={2} width={"65%"} mx={"auto"}>
          <UsernameInput
            clearClick={clear}
            handleUsername={(username) => setUsername(username)}
            handleInvalid={(invalid) => setInvalid(invalid)}
          />
          <PasswordInput
            clearClick={clear}
            handlePassword={(password) => setPassword(password)}
            handleInvalid={(invalid) => setInvalid(invalid)}
          />
          <Box sx={{ display: "flex", gap: 2, flexDirection: "row-reverse" }}>
            <Button
              size="lg"
              variant="text"
              fullWidth
              type="submit"
              color="secondary"
            >
              Submit
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
              Don't have an account? <Link to="/register">Click here</Link> to
              create one.
            </Typography>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default Login;
