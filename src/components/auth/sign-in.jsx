import React from "react";
import AuthForm from "./auth-form";

const SignIn = () => {
  return (
    <div className="form-container">
      <AuthForm signIn={true} />
    </div>
  );
};

export default SignIn;
