import React, { useCallback, useContext, useEffect, useState } from "react";
import CreateEmployee from "../components/Employee/CreateEmployee";
import EmployeeTable from "../components/Employee/EmployeeTable";
import { AuthContext } from "../context/AuthContext";
import { get } from "../helper/ApiCall";

const Employee = () => {
  const [data, setData] = useState([]);
  const { token } = useContext(AuthContext);

  const getData = useCallback(async () => {
    try {
      let response = await get("employee", token);

      setData(response);
    } catch (err) {
      //console.log(err);
    }
  }, [token]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div style={{ paddingBottom: 10 }}>
      <CreateEmployee reload={getData} />
      <EmployeeTable employees={data} />
    </div>
  );
};

export default Employee;
