import React, { useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { themeContext } from "../Context";
import Nav from "react-bootstrap/Nav";

import AWelcome from "./Pages/AWelcome";
import VerifyUsers from "./Pages/VerifyUsers";
import TransferOwnership from "./Pages/TransferOwnership";
import ManageUsers from "./Pages/ManageUsers";
import AllLandList from "./Pages/AllLandList";
import AddLand from "./Pages/AddLand/AddLand";
import AddFardPhoto from "./Pages/AddFardPhoto";

const AdminPanel = () => {
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
            Manage Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setSelectedTab(3);
            }}
            eventKey="link-4"
            style={{
              color: darkMode ? "var(--yellow)" : "var(--dark)",
            }}
          >
            Add Land
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
            Add Fard Photo
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setSelectedTab(5);
            }}
            eventKey="link-6"
            style={{
              color: darkMode ? "var(--yellow)" : "var(--dark)",
            }}
          >
            Manage Lands
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setSelectedTab(6);
            }}
            eventKey="link-7"
            style={{
              color: darkMode ? "var(--yellow)" : "var(--dark)",
            }}
          >
            Transfer Ownership
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {selectedTab === 0 && <AWelcome />}
      {selectedTab === 1 && <VerifyUsers />}
      {selectedTab === 2 && <ManageUsers />}
      {selectedTab === 3 && <AddLand />}
      {selectedTab === 4 && <AddFardPhoto />}
      {selectedTab === 5 && <AllLandList />}
      {selectedTab === 6 && <TransferOwnership />}
    </Container>
  );
};

export default AdminPanel;
