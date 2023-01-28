import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import RateReviewSharpIcon from "@mui/icons-material/RateReviewSharp";
import { UserContext, ColorModeContext } from "../App";
import { Brightness3, Brightness7 } from "@mui/icons-material";

const Navbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (user === null) {
    return (
      <AppBar component="nav" color="default">
        <Toolbar variant="dense">
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              mx: 4,
            }}
          >
            <Box
              sx={{ maxWidth: 120, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              EZ Site <RateReviewSharpIcon color="primary" fontSize="large" />
            </Box>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4, mx: 4 }}>
            {["Home"].map((item) => (
              <NavLink
                end
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
                key={item}
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: "blueviolet",
                        textDecoration: "none",
                        scale: "1.2",
                      }
                    : {
                        color: "inherit",
                        textDecoration: "none",
                      };
                }}
              >
                <Typography
                  variant="button"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item}
                </Typography>
              </NavLink>
            ))}
            <Button
              onClick={() => navigate("/login")}
              color="secondary"
              variant="outlined"
            >
              Login
            </Button>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness3 />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
  } else if (location.pathname !== "/app")
    return (
      <AppBar component="nav" color="default">
        <Toolbar variant="dense">
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              mx: 4,
            }}
          >
            <Box
              sx={{ maxWidth: 120, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              EZ Site <RateReviewSharpIcon color="primary" fontSize="large" />
            </Box>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4, mx: 4 }}>
            {["Home", "App", "Account"].map((item) => (
              <NavLink
                end
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
                key={item}
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: "blueviolet",
                        textDecoration: "none",
                        scale: "1.2",
                      }
                    : {
                        color: "inherit",
                        textDecoration: "none",
                      };
                }}
              >
                <Typography
                  variant="button"
                  sx={{
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item}
                </Typography>
              </NavLink>
            ))}
            <Button
              color="secondary"
              variant="outlined"
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
              Logout
            </Button>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness3 />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
};

export default Navbar;
