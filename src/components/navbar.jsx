import { Button } from "react-bootstrap";
import React, { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthContext from "../contexts/auth";

const NavBar = () => {
  const { pathname } = useLocation();
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const logout = () => {
    authContext.logout();
    history.push("/signin");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            as={Link}
            to="/posts"
            className={pathname === "/posts" && "-nav-active"}
          >
            Posts
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/createpost"
            className={pathname === "/createpost" && "-nav-active"}
          >
            Create Post
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Button onClick={logout} variant="dark">
        Logout
      </Button>
    </Navbar>
  );
};

export default NavBar;
