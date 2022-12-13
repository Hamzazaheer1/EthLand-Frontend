import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "../Context";
import SAWelcome from "./Pages/SAWelcome";
import ChangeCO from "./Pages/ChangeCO";
import AddAdmin from "./Pages/AddAdmin";
import ViewAdmins from "./Pages/ViewAdmins";
import PhysicalVerification from "./Pages/PhysicalVerification";

const SuperAdminPanel = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container>
      <Nav
        variant="tabs"
        defaultActiveKey="/home"
        style={{ borderColor: darkMode ? "var(--yellow)" : "var(--dark)" }}
      >
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setSelectedTab(0);
            }}
            eventKey="link-1"
            href=""
            style={{
              color: darkMode ? "var(--yellow)" : "var(--dark)",
            }}
          >
            Welcome
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setSelectedTab(1);
            }}
            eventKey="link-2"
            href=""
            style={{
              color: darkMode ? "var(--yellow)" : "var(--dark)",
            }}
          >
            Change CO
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setSelectedTab(2);
            }}
            eventKey="link-3"
            href=""
            style={{
              color: darkMode ? "var(--yellow)" : "var(--dark)",
            }}
          >
            Add Admin
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setSelectedTab(3);
            }}
            eventKey="link-4"
            href=""
            style={{
              color: darkMode ? "var(--yellow)" : "var(--dark)",
            }}
          >
            View Admin
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setSelectedTab(4);
            }}
            eventKey="link-5"
            href=""
            style={{
              color: darkMode ? "var(--yellow)" : "var(--dark)",
            }}
          >
            Physical Verification
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {selectedTab === 0 && <SAWelcome />}
      {selectedTab === 1 && <ChangeCO />}
      {selectedTab === 2 && <AddAdmin />}
      {selectedTab === 3 && <ViewAdmins />}
      {selectedTab === 4 && <PhysicalVerification />}
    </Container>
  );
};

export default SuperAdminPanel;
