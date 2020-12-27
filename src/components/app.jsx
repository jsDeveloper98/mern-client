import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContext from "../contexts/auth";
import useAuth from "../hooks/auth";
import useRoutes from "../routes";
import "../styles/app.scss";
import NavBar from "./navbar";

const App = () => {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <NavBar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
