import React,{ useEffect }  from 'react';
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
import React from 'react';
import Cookies from 'js-cookie';
import GameConfigurator from './components/GameConfigurator/GameConfigurator';
import RankingView from './components/ranking/RankingView';


function App() {
  useEffect(() => {
    document.title = 'WIQ';
  }, []);

  const isLoggedIn = !!Cookies.get('user');

  return (
    <Router>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <Navbar style={{ width: '100%' }} /> 
          <Container component="main" className="main" maxWidth="lg" style={{ paddingTop: '64px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} /> 
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={isLoggedIn ? <GameMenu /> : <Login />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/addUser" element={isLoggedIn ? <GameMenu /> : <AddUser />} />
              <Route path="/menu" element={isLoggedIn ? <GameMenu /> : <Login /> } />
              <Route path="/questions" element={isLoggedIn ? <QuestionView /> : <Login />} />
              <Route path="/historical" element={isLoggedIn ? <HistoricalView /> : <Login />} />
              <Route path="/configurator" element={isLoggedIn ? <GameConfigurator /> : <Login />}/>
              <Route path="/ranking" element={isLoggedIn ? <RankingView /> : <Login />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Container>
        </div>
    </Router>
  );
}

export default App;