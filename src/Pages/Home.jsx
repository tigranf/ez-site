import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import { Link } from "react-router-dom";
import AnimatedPage from "../Components/AnimatedPage";
import { RateReviewSharp } from "@mui/icons-material";

const Home = () => {
  return (
    <AnimatedPage>
      <Box sx={{ overflowX: "hidden", mx: 2 }}>
        <Grid container spacing={3} mx="auto">
          <Grid
            item
            xs={12}
            md={5}
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
                Welcome to{" "}
                <span style={{ color: "#46B4F6", fontSize: "24px" }}>
                  EZ Site{" "}
                  <RateReviewSharp
                    color="primary"
                    fontSize="large"
                    sx={{ mr: 1 }}
                  />
                </span>
                !<br /> We are the premier website for automatically generating
                simple websites with AI generated content. Our goal is to
                provide an easy way for people to create websites with minimal
                effort and time required.
              </Typography>
              <Link style={{ textDecoration: "none" }} to="/register">
                <Button
                  variant="contained"
                  color="info"
                  endIcon={<ArrowForwardSharpIcon />}
                  fullWidth
                  sx={{ fontSize: "16px" }}
                >
                  Generate Your Website Now
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={7} sx={{ overflow: "hidden", display: {xs: 'none', md: 'block'} }}>
            <Grid item>
              <img
                src="/images/computer-website-3d.png"
                alt="Random Hero"
                style={{
                  filter: "saturate(40%) contrast(120%) brightness(70%)",
                  minWidth: 765,
                  maxHeight: 785,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </AnimatedPage>
  );
};

export default Home;
