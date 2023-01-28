import { Paper, Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    if (location.pathname !== '/app') return (
        <Paper
            id='footer'
            component="footer"
            square
            variant="outlined"
            sx={{mt: 'auto'}}
        >
            <Container maxWidth="lg">
                <Typography variant="body1" sx={{
                    textAlign: 'center',
                    textShadow: '0 1px 1px #000',
                    py: '20px',
                    mt: '20px',
                }}>
                    All Rights Reserved &copy; 2023 TigDev LLC
                </Typography>
            </Container>
        </Paper>
    );
};

export default Footer;
