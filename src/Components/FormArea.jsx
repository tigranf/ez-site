import { useState } from "react";
import ConfirmInput from "./ConfirmInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";
import { Typography, Stack, Button, Paper, Box } from "@mui/material";

const FormArea = () => {
  const [password, setPassword] = useState("");
  const [clear, setClear] = useState(false);

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
    await fetch("/api/auth/register", {
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
  };

  return (
    <Paper
      elevation={3}
      sx={{
        py: 6,
        px: 4,
        mt: 4,
        mx: "auto",
        maxWidth: 900,
      }}
    >
      <Typography variant="h4" component="div" textAlign={"center"}>
        Sign Up Form
      </Typography>
      <Typography textAlign={"center"} mt={0.5} mb={2} color="GrayText">
        Fill in the information below.
      </Typography>
      <form onSubmit={(e) => {
        e.preventDefault();
        // console.dir(e.target);
          handleAuthRegister(
            e.target[0].value,
            e.target[2].value,
            e.target[6].value
          );
      }}>
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
        </Stack>
      </form>
    </Paper>
  );
};

export default FormArea;
