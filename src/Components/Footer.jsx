import { Paper, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Paper
            id='footer'
            component="footer"
            square
            variant="elevation"
            sx={{position: 'absolute', bottom: 0, right:0, left: 0}}
        >
            <Container maxWidth="lg">
                <Typography variant="body1" color="#fff" sx={{
                    textAlign: 'center',
                    textShadow: '0 3px 3px #000',
                    filter: 'brightness(400%)',
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
