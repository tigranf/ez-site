import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Clear, Password, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary={"Account Settings"} />
      </ListItemButton>
      <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/change-password");
          }}
        >
          <Password sx={{ mr: 2 }} />
          <Divider flexItem orientation="vertical" sx={{ mr: 2 }} />
          Change Password
        </MenuItem>
        <ConfirmDeleteModal />
        <Divider />
        <MenuItem onClick={handleClose}>
          <Clear sx={{ mr: 2 }} />
          <Divider flexItem orientation="vertical" sx={{ mr: 2 }} />
          Close
        </MenuItem>
      </Menu>
    </>
  );
}
