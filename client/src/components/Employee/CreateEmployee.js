import {
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { useStyles } from "../../style/Styles";
import { post } from "../../helper/ApiCall";
import { AuthContext } from "../../context/AuthContext";
import PlusIcon from "@material-ui/icons/Add";

const CreateEmployee = ({ reload }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [employeeType, setEmployeeType] = useState("General");

  const { token } = useContext(AuthContext);

  const inputChanged = (e, type) => {
    if (type === "email") {
      setEmail(e.target.value);
    } else if (type === "password") {
      setPassword(e.target.value);
    } else if (type === "name") {
      setName(e.target.value);
    } else if (type === "position") {
      setPosition(e.target.value);
    } else if (type === "employeeType") {
      setEmployeeType(e.target.value);
    }
  };

  const addEmployeeCLicked = async () => {
    setLoading(true);
    try {
      await post("employee", token, {
        Email: email,
        Password: password,
        EmployeeType: employeeType,
        Name: name,
        Position: position,
      });
      setLoading(false);
      setEmail("");
      setPassword("");
      setName("");
      setPosition("");
      setEmployeeType("General");
      reload();
      alert("Employee Added Successfully");
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Card className={classes.imputCard} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          New Employee
        </Typography>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={6} className={classes.textFieldHorizontalPadding}>
            <TextField
              fullWidth
              required
              id="email1"
              label="Email"
              value={email}
              onChange={(e) => inputChanged(e, "email")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} className={classes.textFieldHorizontalPadding}>
            <TextField
              fullWidth
              required
              id="password1"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => inputChanged(e, "password")}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={6} className={classes.textFieldHorizontalPadding}>
            <TextField
              fullWidth
              required
              id="name"
              label="Name"
              value={name}
              onChange={(e) => inputChanged(e, "name")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6} className={classes.textFieldHorizontalPadding}>
            <TextField
              fullWidth
              required
              id="position"
              label="Position"
              type="position"
              value={position}
              onChange={(e) => inputChanged(e, "position")}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={6} className={classes.textFieldHorizontalPadding}>
            <Select
              fullWidth
              value={employeeType}
              onChange={(e) => inputChanged(e, "employeeType")}
              variant="outlined"
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={addEmployeeCLicked}
          startIcon={
            loading ? (
              <CircularProgress color="secondary" size={24} />
            ) : (
              <PlusIcon />
            )
          }
        >
          Add Employee
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateEmployee;
