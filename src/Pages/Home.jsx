import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import { Link } from "react-router-dom";
import AnimatedPage from "../Components/AnimatedPage";

const Home = () => {
  return (
    <AnimatedPage>
      <Box sx={{ overflowX: "hidden" }}>
        <Grid container spacing={6}>
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              maxWidth: 700,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box
              sx={{
                px: 4,
                py: 6,
                gap: 2,
                display: "grid",
                alignContent: "center",
                justifyItems: "start",
              }}
            >
              <Typography variant="h3" fontWeight={700}>
                Create Simple Websites Instantly
              </Typography>
              <Typography variant="h6">
                Welcome to EZ Site! We are the premier website for automatically
                generating simple websites with AI generated content. Our goal
                is to provide an easy way for people to create websites with
                minimal effort and time required.
              </Typography>
              <Link style={{ textDecoration: "none" }} to="/register">
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardSharpIcon />}
                  fullWidth
                  sx={{ fontSize: "16px" }}
                >
                  Generate Your Website Now
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} sx={{ overflow: "hidden" }}>
            <img
              src="http://unsplash.it/1520/1600"
              srcSet="http://unsplash.it/1520/1600 2x"
              alt="Random Hero"
              style={{
                filter: "saturate(40%) contrast(120%) brightness(70%)",
                width: "100%",
                height: "100%",
                minWidth: 765,
                minHeight: 800,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </AnimatedPage>
  );
};

export default Home;
