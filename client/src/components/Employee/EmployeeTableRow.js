import React, { useState, useContext } from "react";

import {
  Box,
  Collapse,
  TableCell,
  TableRow,
  Typography,
  Button,
} from "@material-ui/core";

import UpdateEmployee from "./UpdateEmployee";

import { useRowStyles } from "../../style/Styles";
import { Delete } from "../../helper/ApiCall";
import { AuthContext } from "../../context/AuthContext";

const EmployeeTableRow = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const classes = useRowStyles();

  const deletePressed = async (id) => {
    try {
      await Delete(`employee/${id}`, token);
    } catch (err) {
      alert(
        "This employee Can not be deleted, Because it has associated Reviews"
      );
    }
  };

  return (
    <>
      <TableRow
        className={classes.root}
        style={open ? { backgroundColor: "#D4EFDF" } : null}
      >
        <TableCell>
          <Typography variant="body1">{row.email}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row.name}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row.position}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row.employeeType}</Typography>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined"
            onClick={() => setOpen(!open)}
            style={{ marginRight: 5 }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => deletePressed(row.id)}
          >
            Delete
          </Button>
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
              <UpdateEmployee id={row.id} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EmployeeTableRow;
