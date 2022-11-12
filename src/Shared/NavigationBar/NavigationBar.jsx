import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { Container } from "react-bootstrap";
import Toggle from "../Toggle/Toggle";
import TopBar from "../TopBar/TopBar";
import Logo from "../img/logo1.png";
import "./NavigationBar.css";
import { useState } from "react";
import { useEffect } from "react";

const NavigationBar = () => {
  const [isDarkMode, setDarkMode] = React.useState(false);
  const [userState, setUserState] = useState("");

  useEffect(() => {
    if (localStorage.getItem("superadmin")) {
      setUserState("superadmin");
    } else if (localStorage.getItem("admin")) {
      setUserState("admin");
    } else if (localStorage.getItem("user")) {
      setUserState("user");
    }
  }, []);

  console.log(userState);
  return (
    <>
      <TopBar />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              fontWeight: "bold",
              color: "var(--yellow)",
            }}
          >
            <img className="img-fluid" src={Logo} width="50px" />
            EthLand
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">
                <Toggle />
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                AboutUs
              </Nav.Link>
              <Nav.Link as={Link} to="/contactus">
                ContactUs
              </Nav.Link>
              <Nav.Link as={Link} to="/help-panel">
                Help
              </Nav.Link>
              <Nav.Link as={Link} to="/blockchain">
                Blockchain
              </Nav.Link>
              {userState === "superadmin" && (
                <Nav.Link as={Link} to="/superadminpanel">
                  SuperAdminPanel
                </Nav.Link>
              )}
              {userState === "admin" && (
                <Nav.Link as={Link} to="/adminpanel">
                  AdminPanel
                </Nav.Link>
              )}
              {userState === "user" && (
                <Nav.Link as={Link} to="/userpanel">
                  UserPanel
                </Nav.Link>
              )}
              {!userState === "superadmin" &&
                !userState === "admin" &&
                !userState === "user" && (
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                )}
              {!userState === "superadmin" &&
                !userState === "admin" &&
                !userState === "user" && (
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                )}

              <Nav.Link as={Link} to="/logout">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
