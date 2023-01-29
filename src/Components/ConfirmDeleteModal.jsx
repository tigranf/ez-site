import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  DialogActions,
  Divider,
  MenuItem,
  Zoom,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function ConfirmDeleteModal() {
  const { user, setUser } = React.useContext(UserContext);
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccountDelete = async () => {
    let res = await fetch("/api/auth/delete-account", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      setUser(null);
      navigate("/");
      enqueueSnackbar(res.message, {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        TransitionComponent: Zoom,
      });
    }
  };

  return (
    <div>
      <MenuItem
        onClick={() => {
          handleClickOpen();
        }}
      >
        <DeleteForever sx={{ mr: 2 }} />
        <Divider flexItem orientation="vertical" sx={{ mr: 2 }} />
        Delete Account
      </MenuItem>
      <Dialog
        fullWidth
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle textAlign={"center"} id="responsive-dialog-title">
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <DeleteForever color="error" />
            {"Delete Account"}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom textAlign={"center"}>
            Are you absolutely sure that you wish to delete your entire account?
            <br />
            This action can not be undone. All user data will be lost.
          </DialogContentText>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button color="error" onClick={handleAccountDelete} autoFocus>
              Delete Forever
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
