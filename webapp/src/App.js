import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Navbar from './components/fragments/NavBar';
import Home from './components/Home/Home';
import Login from './components/Login';
import Instructions from './components/Instructions'; 

function App() {
  return (
    <Router>
      <Container component="main" maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
