import {
  Card,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Collapse,
  Box,
  TextField,
  CircularProgress,
  Button,
  Grid,
} from "@material-ui/core";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { get, put } from "../../helper/ApiCall";
import { useStyles } from "../../style/Styles";
import PlusIcon from "@material-ui/icons/Add";

const PeerReview = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(false);
  const { token, userData } = useContext(AuthContext);

  const getData = useCallback(async () => {
    //setLoading(true);
    try {
      let response = await get(
        `review/GetByEmployeeFromPeer/${userData.id}`,
        token
      );
      setData(response);
      //setLoading(false);
    } catch (err) {
      console.log(err);
      //setLoading(false);
    }
  }, [token, userData.id]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Card className={classes.imputCard} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Peer Review List
        </Typography>
        {data.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <>
                <TableHead style={{ backgroundColor: "aliceblue" }}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Month</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <Typography variant="body1">Review</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">Posted Date</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">Review For</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRowItem key={row.id} row={row} />
                  ))}
                </TableBody>
              </>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6" color="secondary">
            No Peer Reviews Yet !
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const TableRowItem = ({ row }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { token, userData } = useContext(AuthContext);

  const addComment = async (reviewId) => {
    setLoading(true);
    var param = {
      EmployeeId: userData.id,
      ReviewId: reviewId,
      Comment: comment,
    };
    try {
      await put(`peer`, token, param);
      setLoading(false);
      setComment("");
      alert("Peer Review Comment Added Successfully");
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <>
      <TableRow
        className={classes.root}
        style={open ? { backgroundColor: "#D4EFDF" } : null}
        hover={true}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          <Typography variant="body1">{row.month}</Typography>
        </TableCell>
        <TableCell colSpan={3}>
          <Typography variant="body1">{row.content}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row.date.split(" ")[0]}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row.employee.name}</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
              >
                <Grid item xs={12} style={{ marginBottom: 5 }}>
                  <TextField
                    multiline
                    rows={2}
                    variant="outlined"
                    label="Comment"
                    value={comment}
                    style={{ width: 500 }}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addComment(row.id)}
                    startIcon={
                      loading ? (
                        <CircularProgress color="secondary" size={24} />
                      ) : (
                        <PlusIcon />
                      )
                    }
                  >
                    Add Comment
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default PeerReview;
