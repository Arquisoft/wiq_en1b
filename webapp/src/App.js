import React,{ useEffect }  from 'react';
import QuestionView from './components/questionView/QuestionView';
import GameMenu from './components/GameMenu/GameMenu';
import Navbar from './components/fragments/NavBar';
import Footer from './components/fragments/Footer';
import About from './components/fragments/About';

import ErrorPage from './components/fragments/ErrorPage';
import Home from './components/Home/Home';
import Login from './components/loginAndRegistration/Login';
import AddUser from './components/loginAndRegistration/AddUser';
import Instructions from './components/Instructions'; 
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './custom.css';
import HistoricalView from './components/HistoricalData/HistoricalView';
import Cookies from 'js-cookie';
import GameConfigurator from './components/GameConfigurator/GameConfigurator';
import RankingView from './components/ranking/RankingView';


function App() {
  useEffect(() => {
    document.title = 'WIQ';
  }, []);

  //The double !! converts an expression that can be a boolean into an actual boolean
  const isLoggedIn = !!Cookies.get('user'); 

  return (
    <Router>
        <div style={{ position: 'relative', minHeight: '100vh' }}>
          <Navbar style={{ width: '100%' }} /> 
        <Container component="main" className="main" maxWidth="lg" style={{ paddingTop: '64px' }}>

            <Routes>
              <Route path="/" element={<Navigate to="/home" />} /> 
              <Route path="/home" element={isLoggedIn ? <GameMenu /> : <Home />} />
              <Route path="/login" element={isLoggedIn ? <GameMenu /> : <Login />} />
              <Route path="/instructions" element={<Instructions />} />
              <Route path="/addUser" element={isLoggedIn ? <GameMenu /> : <AddUser />} />
              <Route path="/menu" element={isLoggedIn ? <GameMenu /> : <Login /> } />
              <Route path="/questions" element={ <QuestionView />} />
              <Route path="/historical" element={isLoggedIn ? <HistoricalView /> : <Login />} />
              <Route path="/configurator" element={isLoggedIn ? <GameConfigurator /> : <Login />}/>
              <Route path="/ranking" element={isLoggedIn ? <RankingView /> : <Login />} />
              <Route path="/about" element={<About /> } />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Container>
          <Footer style={{ width: '100%' }} /> 

        </div>

    </Router>
  );
}

export default App;