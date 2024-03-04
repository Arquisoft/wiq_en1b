// import React, { useState } from "react";
// import axios from "axios";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const Login = () => {

  //empieza
  return (
    <div className="wrapper">
      <form action="">
        <div className="wrapper2">
          <h1> Login </h1>
          <div className="input-box">
            <input type="text" placeholder="Username" /*required*/ />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" /*required*/ />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <ButtonMenu />

          <LinkRegister />
        </div>
      </form>
    </div>
  );
};


function ButtonMenu() {
  return (
    <Link to="/menu" className="button-menu">
        <Button>
        Login
      </Button>
      </Link>
  );

}
function LinkRegister() {
  return (
    <Link to="/AddUser" className="button-register" variant="body2">
      Don't you have an account? Register here.
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
