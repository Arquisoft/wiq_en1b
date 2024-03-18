import React from 'react';
import QuestionView from './components/questionView/QuestionView';
import GameMenu from './components/GameMenu/GameMenu';
import Navbar from './components/fragments/NavBar';
import Home from './components/Home/Home';
import Login from './components/loginAndRegistration/Login';
import AddUser from './components/loginAndRegistration/AddUser';
import Instructions from './components/Instructions'; 
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './custom.css';


function App() {
  return (
    <Router>
      <Container component="main" className="main" maxWidth={false}>
      {/* <Navbar />  */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/menu" element={<GameMenu />} />
          <Route path="/questions" element={<QuestionView />} />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
