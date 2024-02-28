import Home from './components/Home/Home';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Navbar from './components/fragments/NavBar'; 


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
