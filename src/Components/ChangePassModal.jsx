import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Divider, MenuItem, Stack } from "@mui/material";
import PasswordInput from "./PasswordInput";
import ConfirmInput from "./ConfirmInput";
import { Box } from "@mui/system";
import { Password } from "@mui/icons-material";

export default function ChangePassModal() {
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [invalid, setInvalid] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    if (
      (password.length > 0 &&
        (password.length < 8 ||
          !/\d/.test(password) ||
          !/[A-Z]/.test(password))) ||
      (confirmPassword.length > 0 && password !== confirmPassword)
    )
      setInvalid(true);
    else if (password.length > 0 && confirmPassword.length > 0)
      setInvalid(false);
  }, [confirmPassword, password]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MenuItem
        onClick={() => {
          handleClickOpen();
        }}
      >
        <Password sx={{ mr: 2 }} /><Divider flexItem orientation="vertical" sx={{ mr: 2 }} /> Change Password
      </MenuItem>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle textAlign={"center"} id="responsive-dialog-title">
          {"Change Password"}
        </DialogTitle>
        <form onSubmit={() => {}}>
          <DialogContent>
            <DialogContentText gutterBottom textAlign={"center"}>
              Enter the new account password below.
            </DialogContentText>
            <Stack spacing={2} width={"65%"} mx={"auto"}>
              <PasswordInput
                handlePassword={(password) => setPassword(password)}
              />
              <ConfirmInput
                handleConfirmPassword={(confirmPassword) =>
                  setConfirmPassword(confirmPassword)
                }
                password={password}
              />
              <Box
                sx={{ display: "flex", gap: 2, flexDirection: "row-reverse" }}
              >
                <Button
                  size="large"
                  variant="text"
                  fullWidth
                  type="submit"
                  color="secondary"
                  disabled={invalid}
                  onClick={() => {
                    if (password.length > 0 && confirmPassword.length > 0)
                      handleClose();
                  }}
                >
                  Submit
                </Button>
                <Button
                  size="large"
                  variant="text"
                  fullWidth
                  type="button"
                  color="error"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Stack>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
