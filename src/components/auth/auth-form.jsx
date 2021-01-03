import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import useHttp from "../../hooks/http";
import { SIGN_IN_URL, SIGN_UP_URL } from "../../http-urls";

const AuthForm = ({ signIn }) => {
  const URL = signIn ? SIGN_IN_URL : SIGN_UP_URL;

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

    const data = await request(URL, "POST", { ...state });

    if (signIn && data) {
      login(data.token, data.userId);
      history.push("/posts");
    } else {
      setState({
        email: "",
        password: "",
      });
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
    <>
      {getMessage() && (
        <Alert variant={getMessage().variant}>{getMessage().message}</Alert>
      )}
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
            value={state.email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handleChange}
            name="password"
            value={state.password}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {signIn ? "Sign In" : "Sign Up"}
        </Button>
      </Form>
    </>
  );
};

export default AuthForm;
