import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmInput from "../Components/ConfirmInput";
import PasswordInput from "../Components/PasswordInput";
import {
  Typography,
  Stack,
  Button,
  Paper,
  Box,
  Zoom,
  IconButton,
  Tooltip,
} from "@mui/material";
import { UserContext } from "../App";
import AnimatedPage from "../Components/AnimatedPage";
import { useSnackbar } from "notistack";
import { ArrowBack } from "@mui/icons-material";

const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formInputs, setFormInputs] = useState({
    password: "",
    confirmPassword: "",
  });
  const [clear, setClear] = useState(false);
  const [invalid, setInvalid] = useState(true);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) navigate("/");
  }, [navigate, user]);

  useEffect(() => {
    if (
      (formInputs.password.length > 0 &&
        (formInputs.password.length < 8 ||
          !/\d/.test(formInputs.password) ||
          !/[A-Z]/.test(formInputs.password))) ||
      (formInputs.confirmPassword.length > 0 &&
        formInputs.password !== formInputs.confirmPassword)
    )
      setInvalid(true);
    else if (
      formInputs.password.length > 0 &&
      formInputs.confirmPassword.length > 0
    )
      setInvalid(false);
  }, [formInputs.confirmPassword, formInputs.password]);

  const handleClear = () => {
    setClear(true);
    setTimeout(() => {
      setClear(false);
    }, 0);
  };

  const handleChangePassword = async () => {
    let res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: formInputs.password,
        user: user,
      }),
    });
    if (!res.ok) {
      enqueueSnackbar(res.message, {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Zoom,
      });
      throw new Error(res.statusText);
    } else {
      res = await res.json();
      console.log(res);
      navigate("/app");
      enqueueSnackbar(res.message, {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Zoom,
      });
    }
  };

  return (
    <AnimatedPage>
      <Paper
        elevation={3}
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
        <Tooltip title="Back">
          <IconButton
            size="large"
            onClick={() => navigate(-1)}
            sx={{ position: "absolute" }}
          >
            <ArrowBack fontSize="60px" />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" component="div" textAlign={"center"}>
          Change Account Password
        </Typography>
        <Typography textAlign={"center"} mt={0.5} mb={2} color="GrayText">
          Fill in the information below to update your account password.
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // console.dir(e.target);
            handleChangePassword();
          }}
        >
          <Stack spacing={2} width={"65%"} mx={"auto"}>
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
          </Stack>
        </form>
      </Paper>
    </AnimatedPage>
  );
};

export default ChangePassword;
