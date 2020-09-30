import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({});

  return (
    <AuthContext.Provider
      value={{ token, setToken, userData, setUserData, auth, setAuth }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
