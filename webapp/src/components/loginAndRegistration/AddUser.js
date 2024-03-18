import React from "react";
import "../../custom.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddUser = () => {
  const { t } = useTranslation("global");

  return (
    <div className="card">
      <div className="card2">
        <form className="form">
          <h1>{t("addUser.title")}</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder={t("addUser.username_placeholder")}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder={t("addUser.password_placeholder")}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder={t("addUser.repeat_password_placeholder")}
              required
            />
          </div>

          <button type="submit">{t("addUser.register_button")}</button>

          <LinkLogin />
        </form>
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
