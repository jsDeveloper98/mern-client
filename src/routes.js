import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/sign-up";
import SignIn from "./components/sign-in";
import CreatePost from "./components/create-post";
import Posts from "./components/posts";
import ErrPage from "./components/err-page";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact={true}>
          <Posts />
        </Route>

        <Route path="/posts">
          <Posts />
        </Route>

        <Route path="/createpost">
          <CreatePost />
        </Route>

        <Route path="/err-page">
          <ErrPage />
        </Route>

        <Route path="/signin">
          <Redirect to="/posts" />
        </Route>

        <Route path="/signup">
          <Redirect to="/posts" />
        </Route>

        <Redirect to="/err-page" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/signin">
        <SignIn />
      </Route>

      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  );
};

export default useRoutes;