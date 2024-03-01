import Typography from "@mui/material/Typography";
import "./NavBar.css";
// import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <div className="navbar-container">
      <Profile />
      <Typography variant="h6" gutterBottom className="navbar-text">
        Know and Win!
      </Typography>
      <Help />
    </div>
  );
}

function Profile() {
  return <img src="/logo.jpg" alt="App logo" />;
}

function Help() {
  return (
    <button className="help-button">
      <img src="/help.png" alt="Help" />
    </button>
  );
}

export default Navbar;
