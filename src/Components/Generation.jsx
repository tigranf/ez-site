import {
  ArrowForwardSharp,
  Brightness3,
  Brightness7,
  Close,
  Menu,
  Send,
  SmartToy,
} from "@mui/icons-material";
import {
  Alert,
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TypewriterComponent from "typewriter-effect";

const Generation = ({ selectedGen, generations }) => {
  let data = generations.find((gen) => gen.id === selectedGen);
  let { title, genObject } = data;
  let {
    names,
    darkColorScheme,
    lightColorScheme,
    headerFontStyle,
    mainFontStyle,
    slogan,
    callToAction,
    logoDescription,
    homepageContent,
  } = genObject;

  const [colorScheme, setColorScheme] = useState("dark");
  const [open, setOpen] = React.useState(true);

  return (
    <Paper
      elevation={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        py: 4,
        px: 3,
        wordWrap: "break-word",
      }}
    >
      <Typography fontStyle={"italic"} variant="h4" gutterBottom>
        <Send sx={{ mr: 2 }} />
        {title}
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2, maxWidth: 600, lineHeight: 1.7, mx: "auto" }}
          >
            Response is generated using OpenAI language processing models. As
            Artificial Intelligence (AI) technology continues to evolve, we are
            striving to provide more accurate results. However, please note that
            the current results may not be entirely accurate or factual. We
            encourage you to check back periodically for improved functionality.
          </Alert>
        </Collapse>
      </Box>

      <Divider variant="middle" />
      <Box>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
          my={4}
          variant="button"
        >
          <SmartToy />
          AI Suggestions:
        </Typography>
        <Divider variant="middle" />
      </Box>

      <Box sx={{ maxWidth: { sm: "60%" }, mx: "auto" }}>
        <Box sx={{ display: "flex", gap: 2, my: 4, ml: -2, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Divider orientation="vertical" flexItem variant="fullWidth" />
            <Box>
              <Typography variant="h5">Header Font Style</Typography>
              <Link target={"_blank"} href={headerFontStyle[0]}>
                {headerFontStyle[1]}
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Divider orientation="vertical" flexItem variant="fullWidth" />
            <Box>
              <Typography variant="h5">Main Font Style</Typography>
              <Link target={"_blank"} href={mainFontStyle[0]}>
                {mainFontStyle[1]}
              </Link>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box>
            <Typography variant="h5">Light Color Scheme</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 4,
                bgcolor: "black",
              }}
            >
              {lightColorScheme &&
                lightColorScheme.map((color, i) => (
                  <Typography
                    sx={{ color: lightColorScheme[i] }}
                    key={i}
                    variant="body1"
                  >
                    {color}
                  </Typography>
                ))}
            </Box>
          </Box>
          <Box>
            <Typography variant="h5">Dark Color Scheme</Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mb: 4,
                bgcolor: "white",
              }}
            >
              {darkColorScheme &&
                darkColorScheme.map((color, i) => (
                  <Typography
                    sx={{ color: darkColorScheme[i] }}
                    key={i}
                    variant="body1"
                  >
                    {color}
                  </Typography>
                ))}
            </Box>
          </Box>
        </Box>
        <Typography variant="h5">The Logo</Typography>
        <Typography mb={4} color={"text.secondary"} variant="body1">
          {logoDescription}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={
          colorScheme === "dark"
            ? { bgcolor: darkColorScheme[1], color: lightColorScheme[3] }
            : { bgcolor: lightColorScheme[1], color: darkColorScheme[3] }
        }
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            sx={() => {
              return {
                backgroundColor:
                  colorScheme === "dark"
                    ? darkColorScheme[0]
                    : lightColorScheme[0],
                color:
                  colorScheme === "light"
                    ? darkColorScheme[3]
                    : lightColorScheme[3],
              };
            }}
            position="static"
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
              <Typography
                variant="h4"
                component="div"
                sx={{ flexGrow: 1, fontSize: { xs: "1.2rem", sm: "2.4rem" } }}
              >
                <TypewriterComponent
                  options={{
                    strings: [names[0], names[1], names[2]],
                    cursor: "_",
                    delay: 50,
                    deleteSpeed: 25,
                    pauseFor: 2000,
                    skipAddStyles: true,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </Typography>
              <IconButton
                color="inherit"
                onClick={() => {
                  colorScheme === "dark"
                    ? setColorScheme("light")
                    : setColorScheme("dark");
                }}
              >
                {colorScheme === "dark" ? <Brightness7 /> : <Brightness3 />}
              </IconButton>
              <Button
                sx={{
                  bgcolor:
                    colorScheme === "dark"
                      ? darkColorScheme[2]
                      : lightColorScheme[2],
                  color:
                    colorScheme === "dark"
                      ? lightColorScheme[3]
                      : darkColorScheme[3],
                  ml: 2,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            py: { xs: 10, md: 12 },
            px: { xs: 4, md: 8 },
            alignItems: "center",
            background: "url(http://unsplash.it/2000/1100)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <Paper
            elevation={12}
            sx={{
              display: "grid",
              placeItems: "center",
              py: 3,
              px: 5,
              background:
                colorScheme === "dark"
                  ? darkColorScheme[1]
                  : lightColorScheme[1],
              width: { xs: "100%", md: "auto" },
            }}
          >
            <Typography
              mb={4}
              color={
                colorScheme === "dark"
                  ? lightColorScheme[3]
                  : darkColorScheme[3]
              }
              variant="h3"
              textAlign={"center"}
              sx={{ fontSize: { xs: "1.5rem", md: "2.2rem" } }}
            >
              {slogan}
            </Typography>
            <Box mb={4}>
              <Button
                variant="text"
                endIcon={<ArrowForwardSharp />}
                size="large"
                sx={
                  colorScheme === "dark"
                    ? {
                        fontSize: { xs: "12px", md: "16px" },
                        bgcolor: darkColorScheme[2],
                        color: "black",
                      }
                    : {
                        fontSize: { xs: "12px", md: "16px" },
                        bgcolor: lightColorScheme[2],
                        color: "black",
                      }
                }
              >
                {callToAction}
              </Button>
            </Box>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            my: 2,
            mx: 1,
            gap: 2,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Card
            elevation={6}
            sx={{
              minWidth: 275,
              maxWidth: "80%",
              bgcolor:
                colorScheme === "dark"
                  ? darkColorScheme[0]
                  : lightColorScheme[0],
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography
                sx={{
                  color:
                    colorScheme === "dark"
                      ? lightColorScheme[0]
                      : darkColorScheme[0],
                }}
                variant="h6"
                component="div"
              >
                {homepageContent[0]}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{
                  bgcolor:
                    colorScheme === "dark"
                      ? darkColorScheme[2]
                      : lightColorScheme[2],
                  color: "black",
                }}
                size="small"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
          <Card
            elevation={6}
            sx={{
              minWidth: 275,
              maxWidth: "80%",
              bgcolor:
                colorScheme === "dark"
                  ? darkColorScheme[0]
                  : lightColorScheme[0],
            }}
          >
            <CardContent sx={{}}>
              <Typography
                sx={{
                  color:
                    colorScheme === "dark"
                      ? lightColorScheme[0]
                      : darkColorScheme[0],
                }}
                variant="h6"
                component="div"
              >
                {homepageContent[1]}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{
                  bgcolor:
                    colorScheme === "dark"
                      ? darkColorScheme[2]
                      : lightColorScheme[2],
                  color: "black",
                }}
                size="small"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
          <Card
            elevation={6}
            sx={{
              minWidth: 275,
              maxWidth: "80%",
              bgcolor:
                colorScheme === "dark"
                  ? darkColorScheme[0]
                  : lightColorScheme[0],
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color:
                    colorScheme === "dark"
                      ? lightColorScheme[0]
                      : darkColorScheme[0],
                }}
                variant="h6"
                component="div"
              >
                {homepageContent[2]}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                sx={{
                  bgcolor:
                    colorScheme === "dark"
                      ? darkColorScheme[2]
                      : lightColorScheme[2],
                  color: "black",
                }}
                size="small"
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Paper>
    </Paper>
  );
};

export default Generation;
