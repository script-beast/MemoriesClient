import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";
import memories from "../../assets/Images/memories.png";
import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("profile"))
  );

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
    setUser(null);
  };

  React.useEffect(() => {
    const token = user?.token;

    if (token) {
      const { exp } = decode(token);
      if (exp < new Date().getTime() / 1000) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
          <img
            className={classes.image}
            src={memories}
            alt="Logo"
            height="60"
          />
        </Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
