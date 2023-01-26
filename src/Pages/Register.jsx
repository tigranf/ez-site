import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmInput from "../Components/ConfirmInput";
import EmailInput from "../Components/EmailInput";
import PasswordInput from "../Components/PasswordInput";
import UsernameInput from "../Components/UsernameInput";
import { Typography, Stack, Button, Paper, Box } from "@mui/material";
import { UserContext } from "../App";
import AnimatedPage from "../Components/AnimatedPage";

let unavailableNames = ["admin", "test", "moderator", "user", "tigran"];

const Register = () => {
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [clear, setClear] = useState(false);
  const [invalid, setInvalid] = useState(true);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user !== null) navigate("/app");
  }, [navigate, user]);

  useEffect(() => {
    if (
      (formInputs.password.length > 0 &&
        (formInputs.password.length < 8 ||
          !/\d/.test(formInputs.password) ||
          !/[A-Z]/.test(formInputs.password))) ||
      (formInputs.username.length > 0 &&
        unavailableNames.some((name) => name === formInputs.username)) ||
      (formInputs.confirmPassword.length > 0 &&
        formInputs.password !== formInputs.confirmPassword) ||
      (formInputs.email.length > 0 &&
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/.test(
          formInputs.email
        ))
    )
      setInvalid(true);
    else if (
      formInputs.password.length > 0 &&
      formInputs.username.length > 0 &&
      formInputs.confirmPassword.length > 0 &&
      formInputs.email.length > 0
    )
      setInvalid(false);
  }, [
    formInputs.confirmPassword,
    formInputs.email,
    formInputs.password,
    formInputs.username,
  ]);

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
      setUser(user);
      navigate("/login");
    } else if (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <AnimatedPage>
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
              formInputs.username,
              formInputs.password,
              formInputs.email
            );
          }}
        >
          <Stack spacing={2} width={"65%"} mx={"auto"}>
            <UsernameInput
              clearClick={clear}
              handleUsername={(username) =>
                setFormInputs({ ...formInputs, username: username })
              }
            />
            <PasswordInput
              clearClick={clear}
              handlePassword={(password) =>
                setFormInputs({ ...formInputs, password: password })
              }
            />
            <ConfirmInput
              clearClick={clear}
              handleConfirmPassword={(confirmPassword) =>
                setFormInputs({
                  ...formInputs,
                  confirmPassword: confirmPassword,
                })
              }
              password={formInputs.password}
            />
            <EmailInput
              clearClick={clear}
              handleEmail={(email) =>
                setFormInputs({ ...formInputs, email: email })
              }
            />
            <Box sx={{ display: "flex", gap: 2, flexDirection: "row-reverse" }}>
              <Button
                size="large"
                variant="text"
                fullWidth
                type="submit"
                color="secondary"
                disabled={invalid}
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
            <Box>
              <Typography>
                Already have an account? <Link to="/login">Click here</Link> to
                sign in.
              </Typography>
            </Box>
          </Stack>
        </form>
      </Paper>
    </AnimatedPage>
  );
};

export default Register;
