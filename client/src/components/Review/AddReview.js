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
  InputLabel,
  Chip,
} from "@material-ui/core";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { useStyles } from "../../style/Styles";
import { get, post } from "../../helper/ApiCall";
import { AuthContext } from "../../context/AuthContext";
import PlusIcon from "@material-ui/icons/Add";

const AddReview = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState("");
  const [employeeId, setEmployeeId] = useState(1);
  const [month, setMonth] = useState("January");
  const [peers, setPeers] = useState([]);
  const [peerNames, setPeerNames] = useState([]);

  const [employee, setEmployee] = useState([]);

  const { token } = useContext(AuthContext);

  const getData = useCallback(async () => {
    try {
      let response = await get("employee", token);
      //console.log(response);
      setEmployee(response);
      setEmployeeId(response[0].id);
    } catch (err) {
      //console.log(err);
    }
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const inputChanged = (e, type) => {
    if (type === "content") {
      setContent(e.target.value);
    } else if (type === "employeeId") {
      setEmployeeId(e.target.value);
    } else if (type === "month") {
      setMonth(e.target.value);
    }
  };

  const addReviewClicked = async () => {
    setLoading(true);
    try {
      await post("review", token, {
        Content: content,
        Month: month,
        EmployeeId: employeeId,
        Peers: peers,
      });
      setLoading(false);
      setContent("");
      setMonth("January");
      setPeers([]);
      setPeerNames([]);
      getData();
      alert("Review Added Successfully");
    } catch (err) {
      //console.log(err);
    }
  };

  const filterForPeers = () => {
    let filteredEmployees = employee.filter(
      (e) => e.id !== employeeId && !peers.includes(e.id)
    );
    return filteredEmployees;
  };

  const addToListOfPeers = (e) => {
    let values = e.target.value.split(",");
    let newPeers = [...peers, parseInt(values[0])];
    let newPeerNames = [...peerNames, values[1]];
    setPeers(newPeers);
    setPeerNames(newPeerNames);
  };

  const handleDelete = (i) => {
    let p = [...peers];
    let pn = [...peerNames];
    let index = p.indexOf(i);

    p.splice(index, 1);
    pn.splice(index, 1);
    setPeers(p);
    setPeerNames(pn);
  };

  return (
    <Card className={classes.imputCard} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Add a Review
        </Typography>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={6} className={classes.textFieldHorizontalPadding}>
            <InputLabel id="monthLabel">Month</InputLabel>
            <Select
              fullWidth
              value={month}
              onChange={(e) => inputChanged(e, "month")}
              variant="outlined"
              labelId="monthLabel"
            >
              <MenuItem value="January">January</MenuItem>
              <MenuItem value="February">February</MenuItem>
              <MenuItem value="March">March</MenuItem>
              <MenuItem value="April">April</MenuItem>
              <MenuItem value="May">May</MenuItem>
              <MenuItem value="June">June</MenuItem>
              <MenuItem value="July">July</MenuItem>
              <MenuItem value="August">August</MenuItem>
              <MenuItem value="September">September</MenuItem>
              <MenuItem value="Octomer">Octomer</MenuItem>
              <MenuItem value="November">November</MenuItem>
              <MenuItem value="Devember">Devember</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} className={classes.textFieldHorizontalPadding}>
            <InputLabel id="empLabel">Employee</InputLabel>
            <Select
              fullWidth
              value={employeeId}
              onChange={(e) => inputChanged(e, "employeeId")}
              variant="outlined"
              labelId="empLabel"
            >
              {employee.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={12} className={classes.textFieldHorizontalPadding}>
            <TextField
              fullWidth
              required
              multiline
              rows={3}
              id="content"
              label="Content"
              value={content}
              onChange={(e) => inputChanged(e, "content")}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center" justify="center">
          <Grid item xs={12} className={classes.textFieldHorizontalPadding}>
            {peers.map((item, key) => {
              return (
                <Chip
                  style={{ margin: 5 }}
                  key={key}
                  label={peerNames[key]}
                  onDelete={() => handleDelete(item)}
                  variant="outlined"
                />
              );
            })}
            <InputLabel id="peerLabel">Peers</InputLabel>
            <Select
              fullWidth
              value=""
              labelId="peerLabel"
              onChange={(e) => addToListOfPeers(e)}
              variant="outlined"
            >
              {filterForPeers().map((item) => (
                <MenuItem key={item.id} value={item.id + "," + item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={addReviewClicked}
          startIcon={
            loading ? (
              <CircularProgress color="secondary" size={24} />
            ) : (
              <PlusIcon />
            )
          }
        >
          Add Review
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddReview;
