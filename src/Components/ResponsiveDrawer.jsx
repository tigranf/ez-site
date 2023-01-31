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
import RateReviewSharpIcon from "@mui/icons-material/RateReviewSharp";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ColorModeContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { CircularProgress, useTheme, Zoom } from "@mui/material";
import { Brightness3, Brightness7 } from "@mui/icons-material";
import SettingsMenu from "./SettingsMenu";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const {
    window,
    children,
    generations,
    selectedGen,
    setSelectedGen,
    isLoading,
  } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { user, setUser } = React.useContext(UserContext);
  const colorMode = React.useContext(ColorModeContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all",
      }}
    >
      <Toolbar>
        <Box
          sx={{ cursor: "pointer", width: "100%", height: "100%" }}
          onClick={() => navigate("/")}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              height: "100%",
              width: "100%",
            }}
          >
            EZ Site <RateReviewSharpIcon color="primary" fontSize="large" />
          </Typography>
        </Box>
      </Toolbar>
      <List>
        <ListItem
          disablePadding
          dense
          sx={{
            filter: "brightness(75%)",
            ":hover": { filter: "brightness(105%)" },
          }}
        >
          <ListItemButton onClick={colorMode.toggleColorMode}>
            <ListItemIcon>
              {theme.palette.mode === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness3 />
              )}
            </ListItemIcon>
            <ListItemText
              primary={
                theme.palette.mode === "dark" ? "Light Theme" : "Dark Theme"
              }
            />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          dense
          sx={{
            filter: "brightness(75%)",
            ":hover": { filter: "brightness(105%)" },
          }}
        >
          <SettingsMenu />
        </ListItem>
        <ListItem
          disablePadding
          dense
          sx={{
            filter: "brightness(75%)",
            ":hover": { filter: "brightness(105%)" },
          }}
        >
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
        <Divider sx={{ mt: "auto" }} />
        <ListItem
          disablePadding
          sx={{
            filter: "brightness(110%)",
            color: "hsl(203, 91%, 62%)",
            transition: "all",
            ":hover": {
              filter: "brightness(100%)",
              outline: "1px solid hsl(203, 91%, 62%)",
              outlineOffset: "-1px",
              borderRadius: 2,
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
              <AddIcon color="info" />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ variant: "h6" }}
              primary={"Generate Site"}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Box
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px black",
            webkitBoxShadow: "inset 0 0 6px black",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "hsl(0,0%,28%)",
            outline: "1px solid hsl(0,0%,28%)",
            outlineOffset: "-1px",
          },
        }}
      >
        {isLoading && (
          <ListItem disablePadding dense>
            <ListItemButton>
              <ListItemIcon>
                <WebAssetIcon />
              </ListItemIcon>
              <ListItemText
                sx={{ display: "flex", justifyContent: "center" }}
                primary={<CircularProgress color="secondary" />}
              />
            </ListItemButton>
          </ListItem>
        )}
        <List sx={{ display: "flex", flexDirection: "column-reverse" }}>
          {generations &&
            generations.map((gen) => (
              <Zoom key={gen.id} in={true} timeout={400}>
                <ListItem
                  disablePadding
                  sx={() => {
                    return gen.id === selectedGen
                      ? {
                          filter: "brightness(100%)",
                          color: "hsl(272, 63%, 55%)",
                          transition: "all",
                          ":hover": {
                            filter: "brightness(90%)",
                          },
                        }
                      : {};
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      setSelectedGen(gen.id);
                    }}
                  >
                    <ListItemIcon>
                      <WebAssetIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={gen.title}
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </Zoom>
            ))}
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid #474747",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div" mr={"auto"}>
            Welcome, {user?.username || ""}.
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
        sx={() => {
          return theme.palette.mode === "dark"
            ? {
                flexGrow: 1,
                width: `calc(100% - ${drawerWidth}px)` ,
                minHeight: "calc(100vh - 48px)",
                backgroundImage: "url('/images/stacked-waves-haikei-1.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }
            : {
                flexGrow: 1,
                width: `calc(100% - ${drawerWidth}px)` ,
                minHeight: "calc(100vh - 48px)",
                backgroundImage: "url('/images/stacked-waves-haikei-2.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              };
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
