import { Box, Grid, Typography, Button, Divider } from "@mui/material";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "../Components/AnimatedPage";
import { PriorityHigh } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <AnimatedPage>
      <Box sx={{ overflowX: "hidden", maxWidth: 1200, mx: "auto", mb: 8 }}>
        <Grid
          container
          spacing={{ xs: 1, md: 3 }}
          direction={{ xs: "column-reverse", sm: "row" }}
        >
          <Grid
            item
            xs={10}
            md={6}
            sx={{
              maxWidth: 700,
              display: "grid",
              placeItems: "center",
              mx: "auto",
            }}
          >
            <Box
              sx={{
                px: 2,
                py: { xs: 1, md: 6 },
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
                <span
                  style={{
                    color: theme.palette.primary.dark,
                    fontSize: "24px",
                  }}
                >
                  EZ Site
                  <img
                    src="/favicon.ico"
                    alt="EZ Site Logo"
                    width={30}
                    height={30}
                    style={{
                      background: "hsl(255,0%,0%,0.2)",
                      borderRadius: "50%",
                      translate: "2px 4px",
                    }}
                  />
                  <PriorityHigh
                    color="action"
                    fontSize="large"
                    sx={{ ml: -1, mb: -0.5 }}
                  />
                </span>
                <br /> We are the premier website for automatically generating
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
          <Grid item xs={8} md={6} sx={{ overflow: "hidden", mx: "auto" }}>
            <Grid item sx={{ px: { xs: 10, md: 2 }, py: 1 }}>
              <Box sx={{ objectFit: "scale-down" }}>
                <img
                  src="/images/computer-website-3d.webp"
                  alt="3D render of computer with abstract art coming out of the screen"
                  style={{
                    filter:
                      theme.palette.mode === "dark"
                        ? "saturate(40%) contrast(120%) brightness(75%)"
                        : "",
                    width: "100%",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box
        maxWidth={800}
        mx="auto"
        px={4}
        display={"flex"}
        flexDirection="column"
        gap={4}
        my={6}
        textAlign="justify"
      >
        <Typography variant="h6">
          Hi 👋, thanks for coming to EZ Site! We are the premier website for
          automatically generating a simple website layout with some AI 🤖
          generated content. Our goal is to make it easier than ever for people
          to create their own websites in minutes, 🌐 without any coding
          knowledge.
        </Typography>
        <Divider variant="middle" />
        <Typography variant="h6">
          At EZ Site, we believe that anyone can have an online presence with
          minimal 🏃 effort and 🕓 time investment. That's why we provide a
          platform for users to generate a simple website layout with some AI
          generated content in just a few clicks 💻.
        </Typography>
        <Divider variant="middle" />
        <Typography variant="h6">
          We are committed to providing a safe and secure platform for users to
          generate their own websites quickly and easily. Our platform is
          designed to be intuitive and user friendly, so you can rest assured
          that your information is safe with us 🔐. So what are you waiting for?
          Sign up now and start creating your own website today!
        </Typography>
        <Button sx={{ mx: "auto", p: 4 }} size="large" onClick={() => navigate('/register')}>
          Sign Up Now!
        </Button>
      </Box>
    </AnimatedPage>
  );
};

export default Home;
