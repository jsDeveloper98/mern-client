import React, { useContext, useEffect, useState } from "react";
import useHttp from "../hooks/http";
import AuthForm from "./auth-form";
import { Alert } from "react-bootstrap";
import AuthContext from "../contexts/auth";
import { useHistory } from "react-router-dom";

const SIGN_IN_URL = "http://localhost:5000/auth/signin";

const SignIn = () => {
  const { request, error, success, clearError, clearSuccess } = useHttp();
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        clearSuccess();
      }, 2000);
    }
  }, [success, clearSuccess]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearError();
      }, 2000);
    }
   
  }, [error, clearError]);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await request(SIGN_IN_URL, "POST", { ...state });

    if (data) {
      login(data.token, data.userId);
      history.push("/posts");
    }
  };

  const getMessage = () => {
    if (error) {
      return {
        variant: "danger",
        message: error,
      };
    } else if (success) {
      return {
        variant: "success",
        message: success,
      };
    } else {
      return null;
    }
  };

  return (
    <div className="form-container">
      {getMessage() && (
        <Alert variant={getMessage().variant}>{getMessage().message}</Alert>
      )}
      <AuthForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        email={state.email}
        password={state.password}
      />
    </div>
  );
};

export default SignIn;
