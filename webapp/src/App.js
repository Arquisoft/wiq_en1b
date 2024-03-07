import React from 'react';
import QuestionView from './components/questionView/QuestionView';


function App() {
  return (
    /*
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
    */
   <QuestionView />
  );
}

export default App;
