import React, { useEffect, useState } from "react";
import useHttp from "../hooks/http";
import AuthForm from "./auth-form";
import { Alert } from "react-bootstrap";

const SIGN_UP_URL = "http://localhost:5000/auth/signup";

const SignUp = () => {
  const { request, error, success, clearError, clearSuccess } = useHttp();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setTimeout(() => {
      clearSuccess();
    }, 2000);
  }, [success, clearSuccess]);

  useEffect(() => {
    setTimeout(() => {
      clearError();
    }, 2000);
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

    await request(SIGN_UP_URL, "POST", { ...state });

    setState({
      email: "",
      password: "",
    });
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

export default SignUp;
