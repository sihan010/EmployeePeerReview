import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import NavigationBar from "../components/NavigationBar";
import TabBar from "../components/TabBar";
import { AuthContext } from "../context/AuthContext";
import Login from "../components/Login";

const Home = () => {
  const { auth } = useContext(AuthContext);
  return auth ? (
    <>
      <Grid container direction="column">
        <NavigationBar />
        <Grid item container>
          <Grid item lg={1} />
          <Grid item xs={12} md={12} lg={10}>
            <TabBar />
          </Grid>
          <Grid item lg={1} />
        </Grid>
      </Grid>
    </>
  ) : (
    <Login />
  );
};

export default Home;
