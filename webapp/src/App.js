import Home from './components/Home';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


function Navbar() {
  return (
      <Typography variant="h6" gutterBottom>
        Know and Win!
      </Typography>
  );
}

function App() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Navbar /> 
      <Home />
    </Container>
  );
}

export default App;
