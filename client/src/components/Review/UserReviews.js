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
} from "@material-ui/core";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { get } from "../../helper/ApiCall";
import { useStyles } from "../../style/Styles";

const UserReviews = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(false);
  const { userData, token } = useContext(AuthContext);

  const getData = useCallback(async () => {
    //setLoading(true);
    try {
      let response = await get(`review/GetByEmployee/${userData.id}`, token);
      setData(response);
      //setLoading(false);
    } catch (err) {
      console.log(err);
      //setLoading(false);
    }
  }, [userData.id, token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Card className={classes.imputCard} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          My Review List
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
            No Reviews Yet !
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const TableRowItem = ({ row }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [peerData, setPeerData] = useState([]);

  const { token } = useContext(AuthContext);

  const getData = useCallback(async () => {
    try {
      let response = await get(`review/GetByReviewFromPeer/${row.id}`, token);
      setPeerData(response);
    } catch (err) {
      //console.log(err);
    }
  }, [row.id, token]);

  useEffect(() => {
    getData();
  }, [getData]);

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
              <Typography variant="h6">
                {peerData.length} people are monitoring this review
              </Typography>
              {peerData.map((item, key) => (
                <div key={key}>
                  <Typography
                    variant="h6"
                    display="inline"
                    style={{ marginRight: 5 }}
                  >
                    {item.employeeName}
                  </Typography>
                  <Typography
                    variant="body1"
                    display="inline"
                    style={{ marginRight: 5 }}
                  >
                    says:
                  </Typography>

                  {item.comment !== "" ? (
                    <Typography variant="subtitle1" display="inline">
                      {item.comment}
                    </Typography>
                  ) : (
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      display="inline"
                    >
                      No Comment yet
                    </Typography>
                  )}
                </div>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserReviews;
