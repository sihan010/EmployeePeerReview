import React, { useContext, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Employee from "../routes/Employee";

import Review from "../routes/Review";
import MyReviews from "../routes/MyReviews";
import PeerReviews from "../routes/PeerReviews";
import { AuthContext } from "../context/AuthContext";

const TabBar = () => {
  const [value, setValue] = useState(0);
  const { userData } = useContext(AuthContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const componentSelector = (i) => {
    if (i === 0) return <MyReviews />;
    else if (i === 1) return <PeerReviews />;
    else if (i === 2) return <Employee />;
    else if (i === 3) return <Review />;
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="My Reviews" />
        <Tab label="Peer Reviews" />
        {userData.employeeType === "Admin" && (
          <Tab label="Employee Management" />
        )}
        {userData.employeeType === "Admin" && <Tab label="Review Management" />}
      </Tabs>
      {componentSelector(value)}
    </Paper>
  );
};

export default TabBar;
