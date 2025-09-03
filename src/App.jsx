import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';

export default function App() {
  return (
    <>
      <AppBar position="sticky" color="primary" enableColorOnDark>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Notes
          </Typography>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 500 }}>
            Home
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box sx={{ py: 3 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
}
