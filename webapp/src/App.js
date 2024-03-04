import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import QuestionView from './components/questionView/QuestionView';
import Navbar from './components/fragments/NavBar';
import Home from './components/home/Home';
import Login from './components/Login';
import AddUser from './components/AddUser';
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
          <Route path="/addUser" element={<AddUser />} />
          
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
