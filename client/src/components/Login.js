import {
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { post, postLogin } from "../helper/ApiCall";
import { AuthContext } from "../context/AuthContext";
import LoginIcon from "@material-ui/icons/ExitToApp";
import MainIcon from "@material-ui/icons/BusinessOutlined";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { setToken, setUserData, setAuth } = useContext(AuthContext);

  const validateToken = useCallback(
    async (token) => {
      try {
        var response = await post("auth/ValidateToken", token, {});
        setLoading(false);
        setToken(token);
        setUserData(response);
        setAuth(true);
      } catch (err) {
        //console.log(err);
        setLoading(false);
      }
    },
    [setAuth, setToken, setUserData]
  );

  useEffect(() => {
    let token = localStorage.getItem("peerReviewToken");
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
      setAuth(false);
    }
  }, [validateToken, setLoading, setAuth]);

  const inputChanged = (e, type) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    }
  };

  const loginClicked = async () => {
    setError(false);
    try {
      let response = await postLogin("auth/login", {
        Email: email,
        Password: password,
      });
      localStorage.setItem("peerReviewToken", response.token);
      setToken(response.token);
      setUserData(response.user);
      setAuth(true);
    } catch (err) {
      //console.log(err);
      setAuth(false);
      setError(true);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "50vh" }}
    >
      {loading ? (
        <CircularProgress color="secondary" size={24} />
      ) : (
        <>
          <Grid
            item
            container
            direction="column"
            xs={12}
            alignItems="center"
            justify="center"
          >
            <MainIcon fontSize="large" />
            <Typography color="textSecondary" variant="h6">
              Sign In
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ width: 500 }}>
            <Grid item xs={12} style={{ margin: 10 }}>
              <TextField
                fullWidth
                required
                error={error}
                id="email"
                label="Email"
                value={email}
                onChange={(e) => inputChanged(e, "email")}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} style={{ margin: 10 }}>
              <TextField
                fullWidth
                required
                error={error}
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => inputChanged(e, "password")}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 10 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              onClick={loginClicked}
            >
              Login
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Login;
