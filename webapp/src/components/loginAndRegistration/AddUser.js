import React from "react";
import "../../custom.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import zxcvbn from "zxcvbn";


const AddUser = () => {
  const navigate = useNavigate();
  const apiUrl = (process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000') + "/adduser";
  const { t } = useTranslation("global");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(undefined);
  const [passwordStrengthText, setPasswordStrengthText] = useState('Weak password');
  const [submitError, setSubmitError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //TODO: Add more validations
      if(password !== repeatPassword){ //User put the same password
        setSubmitError('Passwords do not match');
      } else if(/\s/.test(password)){ //User put spaces in password
        setSubmitError('Password cannot contain spaces');
      } else if(password.length < 8){ //Password too short
        setSubmitError('Password must be at least 8 characters long');
      } else if(password.length > 64){ //Password too long
        setSubmitError('Password cannot be over 64 characters long');
      } else{ //Continue
        setSubmitError('');
        const response = await axios.post(apiUrl, { username, password });
        console.log("Registered user: " + response.data.username);
        navigate('/login');
      }

    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const newStrength = zxcvbn(newPassword);

    switch(newStrength.score){
      case 0:
        setPasswordStrengthText('Weak password');
        break;
      case 1:
        setPasswordStrengthText('Weak password');
        break;
      case 2:
        setPasswordStrengthText('Fair password');
        break;
      case 3:
        setPasswordStrengthText('Good password');
        break;
      case 4:
        setPasswordStrengthText('Strong password');
        break;
      default:
        setPasswordStrengthText('Weak password');
        break;
    }
    setPasswordStrength(newStrength);
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
          <div className="input-box-password-register">
            <p>{t("addUser.password_placeholder")}:</p>
            <input
                name = "password"
                type="password"
                placeholder={t("addUser.password_placeholder")}
                required
                value={password}
                onChange={handlePasswordChange}
              />
          </div>
          <div className="password-strength-meter">
            <span>
              {passwordStrengthText}
            </span>
            <progress
              value={passwordStrength === undefined? 0 : passwordStrength.score}
              max="4"
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
          {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
          <button type="submit">{t("addUser.register_button")}</button>

          <LinkLogin />
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
