import React, { useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { themeContext } from "../../Context";
import Nav from "react-bootstrap/Nav";
import UWelcome from "./Pages/UWelcome";
import MyLand from "./Pages/MyLand";
import SendRequests from "./Pages/SendRequests";
import ReceiveRequests from "./Pages/ReceiveRequests";
import PurchaseableLands from "./Pages/PurchaseableLands";
import LandForSale from "./Pages/LandForSale";

const UserPanel = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
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
              eventKey="link-3"
              href=""
              style={{
                color: darkMode ? "var(--yellow)" : "var(--dark)",
              }}
            >
              My Lands
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setSelectedTab(2);
              }}
              eventKey="link-4"
              href=""
              style={{
                color: darkMode ? "var(--yellow)" : "var(--dark)",
              }}
            >
              Send Requests
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setSelectedTab(3);
              }}
              eventKey="link-5"
              href=""
              style={{
                color: darkMode ? "var(--yellow)" : "var(--dark)",
              }}
            >
              Receive Requests
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setSelectedTab(4);
              }}
              eventKey="link-6"
              href=""
              style={{
                color: darkMode ? "var(--yellow)" : "var(--dark)",
              }}
            >
              Purchaseable Lands
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                setSelectedTab(5);
              }}
              eventKey="link-7"
              href=""
              style={{
                color: darkMode ? "var(--yellow)" : "var(--dark)",
              }}
            >
              Make it For Sale
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {selectedTab === 0 && <UWelcome />}
        {selectedTab === 1 && <MyLand />}
        {selectedTab === 2 && <SendRequests />}
        {selectedTab === 3 && <ReceiveRequests />}
        {selectedTab === 4 && <PurchaseableLands />}
        {selectedTab === 5 && <LandForSale />}
      </Container>
      {/* <Footer /> */}
    </div>
  );
};

export default UserPanel;
