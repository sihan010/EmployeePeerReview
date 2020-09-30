import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import EmployeeTableRow from "./EmployeeTableRow";
import { useStyles } from "../../style/Styles";

const EmployeeTable = ({ employees }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [paginatedEmployees, setPaginatedEmployees] = useState(
    employees.slice(0, rowsPerPage)
  );

  useEffect(() => {
    setPage(0);
    setPaginatedEmployees(employees.slice(0, rowsPerPage));
  }, [employees, rowsPerPage]);

  const handleChangeRowsPerPage = (event) => {
    let value = parseInt(event.target.value);

    setRowsPerPage(value, 10);
    setPage(0);

    if (value === -1) setPaginatedEmployees(employees);
    else {
      setPaginatedEmployees(employees.slice(0, value));
    }
  };

  const handlePageChanged = (event, page) => {
    setPage(page);
    setPaginatedEmployees(
      employees.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    );
  };

  return (
    <Card className={classes.imputCard} variant="outlined">
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Employee List
        </Typography>
        {paginatedEmployees.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <>
                <TableHead style={{ backgroundColor: "aliceblue" }}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1">Email</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">Name</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">Position</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">Employee Type</Typography>
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedEmployees.map((row) => (
                    <EmployeeTableRow key={row.id} row={row} />
                  ))}
                </TableBody>
              </>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      20,
                      30,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={5}
                    count={employees.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handlePageChanged}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="h6" color="secondary">
            No Employees Yet !
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EmployeeTable;
