import { Box, Grid, Typography, Button } from "@mui/material";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Box sx={{ overflowX: "hidden", }}>
      <Grid container spacing={6}>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            maxWidth: 700,
            display: 'grid',
            placeItems: 'center'
          }}
        >
          <Box sx={{ px: 4, py: 6, gap: 2, display: "grid", alignContent: "center", justifyItems: "start", }}>
            <Typography variant="h3" fontWeight={700}>
              Let's write some Lorem.
            </Typography>
            <Typography variant="h6">
              Lorem ipsum dolor sit amet, consectetur adip, sed do eiusmod tempor
              incididunt ut labore et, consectetur adipiscing elit. Ut enim ad
              minim. Lorem ipsum dolor sit amet, consectetur adip. Lorem ipsum
              dolor sit amet, consectetur.
            </Typography>
            <Link style={{textDecoration: 'none'}} to='/blogs'>
              <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardSharpIcon />}
                sx={{ width: "200px", fontSize: "16px" }}
              >
                LOREM
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{overflow: 'hidden'}}>
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
  );
};

export default Home;
