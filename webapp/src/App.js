import Home from './components/Home/Home';
import Container from '@mui/material/Container';
import Navbar from './components/fragments/NavBar'; 


function App() {
  return (
    <Container component="main" maxWidth="xl">
      <Navbar /> 
      <Home />
    </Container>
  );
}

export default App;
