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
  IconButton,
  MenuItem,
} from "@mui/material";
import { Delete, DeleteForever, Password } from "@mui/icons-material";

export default function ConfirmDeleteModal() {
  const [open, setOpen] = React.useState(false);

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
        user: localStorage.getItem("user"),
      }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      res = await res.json();
      console.log(res);
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
          <Box sx={{display:'flex',gap:1,alignItems:'center'}}>
            <DeleteForever color="error" />
            {"Delete Account"}
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText gutterBottom textAlign={"center"}>
            Are you absolutely sure that you wish to delete your entire account?
            <br />This action can not be undone. All user data will be lost.
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
