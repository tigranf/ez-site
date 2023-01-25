import { Paper, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Paper
            id='footer'
            sx={{ position: 'fixed', left: 0, bottom: 0, right: 0 }}
            component="footer"
            square
            variant="elevation"
        >
            <Container maxWidth="lg">
                <Typography variant="body1" color="#fff" sx={{
                    textAlign: 'center',
                    textShadow: '0 3px 3px #000',
                    filter: 'brightness(400%)',
                    height: 50,
                    mt: '20px'
                }}>
                    All Rights Reserved &copy; 2023 TigDev LLC
                </Typography>
            </Container>
        </Paper>
    );
};

export default Footer;
