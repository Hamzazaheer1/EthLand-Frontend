import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Utils/auth-context";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Toggle from "../Toggle/Toggle";
import TopBar from "../TopBar/TopBar";
import GreenLogo from "../img/newlogogreen.png";
import "./NavigationBar.css";

const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const [userState, setUserState] = useState("");

  useEffect(() => {
    if (localStorage.getItem("superadmin")) {
      setUserState("superadmin");
      auth.login(userState);
    } else if (localStorage.getItem("admin")) {
      setUserState("admin");
      auth.login(userState);
    } else if (localStorage.getItem("user")) {
      setUserState("user");
      auth.login(userState);
    }
  }, [userState]);

  return (
    <>
      <TopBar />
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ height: "6rem" }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontWeight: "bold", color: "var(--yellow)" }}
          >
            <img
              className="img-fluid"
              src={GreenLogo}
              width="50px"
              alt="greenlogo"
            />
            EthLand
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="bg-dark p-2 rounded"
          >
            <Nav className="me-auto">
              <Nav.Link>
                <Toggle />
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/blockchain">
                Blockchain
              </Nav.Link>
              <Nav.Link as={Link} to="/help-panel">
                Help
              </Nav.Link>
              {!auth.isLoggedIn && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
              {auth.userId === "superadmin" && (
                <Nav.Link as={Link} to="/superadminpanel">
                  SuperAdminPanel
                </Nav.Link>
              )}
              {auth.userId === "admin" && (
                <Nav.Link as={Link} to="/adminpanel">
                  AdminPanel
                </Nav.Link>
              )}

              {auth.userId === "user" && (
                <Nav.Link as={Link} to="/userpanel">
                  UserPanel
                </Nav.Link>
              )}
              {auth.isLoggedIn && (
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              )}
              {!auth.isLoggedIn && (
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/about">
                AboutUs
              </Nav.Link>
              <Nav.Link as={Link} to="/contactus">
                ContactUs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
