import { Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  if (location.pathname !== "/app")
    return (
      <Paper
        id="footer"
        component="footer"
        variant="outlined"
        sx={{ mt: "auto" }}
      >
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              textShadow: "0 1px 1px #000",
              py: "20px",
              mt: "20px",
            }}
          >
            All Rights Reserved &copy; 2023 TigDev LLC
          </Typography>
      </Paper>
    );
};

export default Footer;
