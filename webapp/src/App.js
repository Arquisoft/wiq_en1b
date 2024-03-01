import Home from './components/Home/Home';
import Container from '@mui/material/Container';
import Navbar from './components/fragments/NavBar'; 
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './components/Login';
import AddUser from './components/AddUser';


function App() {
  return (
    <Container component="main" maxWidth="xl">
      <Navbar /> 
      <Home />
    </Container>
  );
}

export default App;
