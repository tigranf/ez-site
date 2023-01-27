import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import RateReviewSharpIcon from "@mui/icons-material/RateReviewSharp";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, children, generations, setSelectedGen } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", transition: 'all' }}>
      <List>
        <ListItem disablePadding sx={{filter: 'brightness(75%)', ':hover': {filter: 'brightness(105%)'}}}>
          <ListItemButton
            onClick={() => {
              navigate("/account");
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Account Settings"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{filter: 'brightness(75%)', ':hover': {filter: 'brightness(105%)'}}}>
          <ListItemButton>
            <ListItemIcon>
              <LightModeIcon />
            </ListItemIcon>
            <ListItemText primary={"Toggle Theme"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{filter: 'brightness(75%)', ':hover': {filter: 'brightness(105%)'}}}>
          <ListItemButton
            onClick={async () => {
              let res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
              if (!res.ok) {
                if (res.status === 500) {
                  console.log(res.message, res.status);
                  throw new Error(res.message);
                } else throw new Error("Other error");
              } else {
                res = await res.json();
                console.log(res.message);
                setUser(null);
                localStorage.removeItem("user");
                navigate("/");
              }
            }}
          >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ mt: "auto" }} />
      <ListItem
        disablePadding
        sx={{
          filter: "brightness(120%)",
          color: "#CA91D8",
          transition: "all",
          ":hover": {
            filter: "brightness(100%)",
            outline: "1px solid gray",
            outlineOffset: "-2px",
          },
        }}
      >
        <ListItemButton
          divider={true}
          onClick={() => {
            setSelectedGen(0);
          }}
        >
          <ListItemIcon>
            <AddIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={"Generate Site"} />
        </ListItemButton>
      </ListItem>
      <List>
        {generations &&
          generations.map((gen, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton
                onClick={() => {
                  setSelectedGen(gen.id);
                }}
              >
                <ListItemIcon>
                  <WebAssetIcon />
                </ListItemIcon>
                <ListItemText primary={gen.title} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div" mr={"auto"}>
            Welcome {user?.username || ""}.
          </Typography>
          <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "flex" },
                fontWeight: "bold",
              }}
            >
              EZ Site <RateReviewSharpIcon color="primary" fontSize="large" />
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
