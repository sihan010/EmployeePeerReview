import { Grid, Typography, Button } from "@material-ui/core";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import MainIcon from "@material-ui/icons/BusinessOutlined";
import Logout from "@material-ui/icons/ExitToApp";

const NavigationBar = () => {
  const { userData, setToken, setUserData, setAuth } = useContext(AuthContext);

  const logoutPressed = () => {
    localStorage.removeItem("peerReviewToken");
    setToken(null);
    setUserData({});
    setAuth(false);
  };

  return (
    <Grid
      container
      direction="row"
      style={{ backgroundColor: "#A2D9CE", padding: 20, marginBottom: 10 }}
    >
      <Grid
        item
        container
        xs={8}
        direction="row"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item>
          <MainIcon fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{ marginLeft: 10 }}>
            Employee Peer Review System
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={4}
        direction="row"
        alignItems="center"
        justify="flex-end"
      >
        <Grid item>
          <Typography variant="body1" style={{ marginRight: 10 }}>
            <span style={{ fontWeight: "bold" }}>{userData.name}</span>
            {` (${userData.employeeType})`}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={logoutPressed}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NavigationBar;
