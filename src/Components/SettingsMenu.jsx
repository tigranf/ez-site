import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Clear, Delete, Settings } from '@mui/icons-material';
import ChangePassModal from './ChangePassModal';

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
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
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ChangePassModal />
        <MenuItem onClick={handleClose}><Delete sx={{mr:2}}/><Divider flexItem orientation="vertical" sx={{ mr: 2 }} /> Delete Account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}><Clear sx={{mr:2}}/><Divider flexItem orientation="vertical" sx={{ mr: 2 }} /> Close</MenuItem>
      </Menu>
    </>
  );
}