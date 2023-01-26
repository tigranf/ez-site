import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import RateReviewSharpIcon from "@mui/icons-material/RateReviewSharp";
import { UserContext } from "../App";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (user === null) {
    return (
      <AppBar component="nav">
        <Toolbar>
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
                        color: "Highlight",
                        textDecoration: "none",
                        scale: "1.2",
                      }
                    : {
                        color: "ButtonHighlight",
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
          </Box>
        </Toolbar>
      </AppBar>
    );
  } else
    return (
      <AppBar component="nav">
        <Toolbar>
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
            {["App", "Account"].map((item) => (
              <NavLink
                end
                to={item === "Home" ? "/" : "/" + item.toLowerCase()}
                key={item}
                style={({ isActive }) => {
                  return isActive
                    ? {
                        color: "Highlight",
                        textDecoration: "none",
                        scale: "1.2",
                      }
                    : {
                        color: "ButtonHighlight",
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
              onClick={() => {
                setUser(null);
                localStorage.removeItem("user");
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
};

export default Navbar;
