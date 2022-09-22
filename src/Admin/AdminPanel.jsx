import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "../Context";
import AWelcome from "./Pages/AWelcome";
import VerifyUsers from "./Pages/VerifyUsers";
import VerifyLand from "./Pages/VerifyLand";
import TransferOwnership from "./Pages/TransferOwnership";
import ManageUsers from "./Pages/ManageUsers";

const AdminPanel = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      {/* <NavigationBar /> */}
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
              Verify User
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
              Verify Land
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
              Transfer Ownership
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setSelectedTab(4);
              }}
              eventKey="link-5"
              style={{
                color: darkMode ? "var(--yellow)" : "var(--dark)",
              }}
            >
              Manage Users
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {selectedTab === 0 && <AWelcome />}
        {selectedTab === 1 && <VerifyUsers />}
        {selectedTab === 2 && <VerifyLand />}
        {selectedTab === 3 && <TransferOwnership />}
        {selectedTab === 4 && <ManageUsers />}
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminPanel;
