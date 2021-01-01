import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/auth/sign-up";
import SignIn from "./components/auth/sign-in";
import CreatePost from "./components/posts/create-post";
import ErrPage from "./components/err-page";
import PostList from "./components/posts/post-list";
import PostDetails from "./components/posts/post-details";

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact={true}>
          <PostList />
        </Route>

        <Route path="/posts" exact={true}>
          <PostList />
        </Route>

        <Route path="/posts/:id">
          <PostDetails />
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
