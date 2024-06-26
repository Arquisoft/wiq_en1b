import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../custom.css";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/login";
  const { t } = useTranslation("global");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post(apiUrl, { username, password });
        let oneHourAfter = new Date().getTime() + (1 * 60 * 60 * 1000)
        Cookies.set('user', JSON.stringify({username : response.data.username, token : response.data.token})
                    , {expires:oneHourAfter});
        navigate('/menu');
        window.location.reload();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="general">
         
    <div className="card">
      
      <div className="card2">
        
        <form className="form" onSubmit={handleSubmit}>
       

          <h1 className="title-login">{t("login.title")}</h1>
          <div className="input-box">
              <input
                type="text"
                placeholder={t("login.username_placeholder")}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="input-box">
              <input
                type="password"
                placeholder={t("login.password_placeholder")}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>

          <button type="submit">{t("login.login_button")}</button>
          <LinkForgetPassword />
          <LinkRegister />
          
          
        </form>
      </div>
    </div>
    </div>
  );
};

function LinkRegister() {
  const { t } = useTranslation("global");
  return (
    <Link to="/AddUser" className="button-register" variant="body2">
      {t("login.register_link")}
    </Link>
  );
}

function LinkForgetPassword(){
  const { t } = useTranslation("global");
  return (
    <Link to="/restorePassword" className="button-register" variant="body2">
      {t("login.forget_pass")}
    </Link>
  );
}



export default Login;

// // src/components/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loginSuccess, setLoginSuccess] = useState(false);
//   const [createdAt, setCreatedAt] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

//   const loginUser = async () => {
//     try {
//       const response = await axios.post(`${apiEndpoint}/login`, { username, password });

//       // Extract data from the response
//       const { createdAt: userCreatedAt } = response.data;

//       setCreatedAt(userCreatedAt);
//       setLoginSuccess(true);

//       setOpenSnackbar(true);
//     } catch (error) {
//       setError(error.response.data.error);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
//       {loginSuccess ? (
//         <div>
//           <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
//             Hello {username}!
//           </Typography>
//           <Typography component="p" variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
//             Your account was created on {new Date(createdAt).toLocaleDateString()}.
//           </Typography>
//         </div>
//       ) : (
//         <div>
//           <Typography component="h1" variant="h5">
//             Login
//           </Typography>
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             fullWidth
//             label="Password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Button variant="contained" color="primary" onClick={loginUser}>
//             Login
//           </Button>
//           <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Login successful" />
//           {error && (
//             <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
//           )}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default Login;