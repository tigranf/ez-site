
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmInput from "../Components/ConfirmInput";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import UsernameInput from "../Components/UsernameInput";
import { Typography, Stack, Button, Paper, Box } from "@mui/material";

const Register = () => {
  const [password, setPassword] = useState("");
  const [clear, setClear] = useState(false);
  const navigate = useNavigate();

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handleClear = () => {
    setClear(true);
    setTimeout(() => {
      setClear(false);
    }, 0);
  };

  const handleAuthRegister = async (username, password, email) => {
    let res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    });
    res = await res.json();
    let { user, error } = res;
    if (user) {
      console.log(user);
      navigate('/login');
    } else if (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <Paper
      elevation={3}
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
        Sign Up Form
      </Typography>
      <Typography textAlign={"center"} mt={0.5} mb={2} color="GrayText">
        Fill in the information below.
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.dir(e.target);
          handleAuthRegister(
            e.target[0].value,
            e.target[2].value,
            e.target[6].value
          );
        }}
      >
        <Stack spacing={2} width={"65%"} mx={"auto"}>
          <UsernameInput clearClick={clear} />
          <PasswordInput clearClick={clear} handlePassword={handlePassword} />
          <ConfirmInput clearClick={clear} password={password} />
          <EmailInput clearClick={clear} />
          <Box sx={{ display: "flex", gap: 2, flexDirection: "row-reverse" }}>
            <Button
              size="large"
              variant="text"
              fullWidth
              type="submit"
              color="secondary"
            >
              Submit
            </Button>
            <Button
              size="large"
              variant="text"
              fullWidth
              type="button"
              color="error"
              onClick={handleClear}
            >
              Clear
            </Button>
          </Box>
          <Box >
            <Typography >
              Already have an account? <Link to='/login' >Click here</Link>  to sign in.
            </Typography>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default Register;
