import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import RateReviewSharpIcon from '@mui/icons-material/RateReviewSharp';

const Navbar = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, mx: 4 }}
        >
          EZ Site <RateReviewSharpIcon color="primary" fontSize="large" />
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mx: 4 }}>
          {['Home', 'About', 'Login', 'Register'].map((item) => (
            <NavLink
              end
              to={item === 'Home' ? '/' : '/' + item.toLowerCase()}
              key={item}
              style={({ isActive }) => {
                return isActive ?
                  {
                    color: 'Highlight',
                    textDecoration: 'none',
                    scale: '1.2',
                  }
                  :
                  {
                    color: 'ButtonHighlight',
                    textDecoration: 'none',
                  }
              }}
            >
              <Typography
                variant="button"
                sx={{
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                {item}
              </Typography>
            </NavLink>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar