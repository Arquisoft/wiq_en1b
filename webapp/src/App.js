import React from 'react';
import QuestionView from './components/questionView/QuestionView';
import GameMenu from './components/GameMenu/GameMenu';
import Navbar from './components/fragments/NavBar';
import ErrorPage from './components/fragments/ErrorPage';
import Home from './components/Home/Home';
import Login from './components/loginAndRegistration/Login';
import AddUser from './components/loginAndRegistration/AddUser';
import Instructions from './components/Instructions'; 
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './custom.css';
import HistoricalView from './components/HistoricalData/HistoricalView';
import { UserContextProvider } from './components/loginAndRegistration/UserContext';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <Navbar style={{ width: '100%' }} /> 
          <Container component="main" className="main" maxWidth="lg" style={{ paddingTop: '64px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} /> 
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/addUser" element={<AddUser />} />
              <Route path="/menu" element={<GameMenu />} />
              <Route path="/questions" element={<QuestionView />} />
              <Route path="/historical" element={<HistoricalView />} />
              {/* Esta ruta atrapará cualquier ruta no definida */}
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Container>
        </div>
      </UserContextProvider>
    </Router>
  );
}

export default App;