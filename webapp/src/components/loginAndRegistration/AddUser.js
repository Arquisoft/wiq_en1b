import React from "react";
import "../../custom.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddUser = () => {
  const navigate = useNavigate();
  const apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/adduser";
  const { t } = useTranslation("global");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //TODO: Add more validations
      if(password === repeatPassword){ //User put the same password
        const response = await axios.post(apiUrl, { username, password });
        console.log("Registered user: " + response.data.username);
        navigate('/login');
      }
      else{
        //TODO: Show some errors to the user
      }

    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="general">
    <div className="card">
      <div className="card2">
        <form className="form" onSubmit={handleSubmit}>
          <h1>{t("addUser.title")}</h1>
          <div className="input-box">
            <p>{t("addUser.username_placeholder")}:</p>
            <input
                name = "username"
                type="text"
                placeholder={t("addUser.username_placeholder")}
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="input-box">
            <p>{t("addUser.password_placeholder")}:</p>
            <input
                name = "password"
                type="password"
                placeholder={t("addUser.password_placeholder")}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className="input-box">
            <p>{t("addUser.repeat_password_placeholder")}:</p>
            <input
              name = "repeat_password"
              type="password"
              placeholder={t("addUser.repeat_password_placeholder")}
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>

          <button type="submit">{t("addUser.register_button")}</button>

          {/* <LinkLogin /> */}

          <Link to="/Home" className="buttonb" variant="body2">
          <button class="button-back">
            
  <div class="button-box">
    <span class="button-elem">
      <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
        ></path>
      </svg>
    </span>
    <span class="button-elem">
      <svg viewBox="0 0 46 40">
        <path
          d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
        ></path>
      </svg>
    </span>
  </div>
</button>
            </Link>
      </form>
    </div>
    </div>
    </div>
  );
};

function LinkLogin() {
  const { t } = useTranslation("global");
  return (
    <Link to="/login" className="button-login" variant="body2">
      {t("addUser.login_link")}
    </Link>
  );
}

export default AddUser;

//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   const addUser = async () => {
//     try {
//       await axios.post(`${apiEndpoint}/adduser`, { username, password });
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
//       <Typography component="h1" variant="h5">
//         Add User
//       </Typography>
//       <TextField
//         name="username"
//         margin="normal"
//         fullWidth
//         label="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <TextField
//         name="password"
//         margin="normal"
//         fullWidth
//         label="Password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <Button variant="contained" color="primary" onClick={addUser}>
//         Add User
//       </Button>
//       <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="User added successfully" />
//       {error && (
//         <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
//       )}
//     </Container>
//   );
// };
