import React, { useState } from "react";
import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";
import Nav from "react-bootstrap/Nav";
import { Row, Col, Container } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "../../Context";
import GettingStarted from "./Pages/GettingStarted";
import RegisterHelp from "./Pages/RegisterHelp";
import LoginHelp from "./Pages/LoginHelp";

const HelpNav = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <NavigationBar />
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
              GettingStarted
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
              Register Help
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
              Login Help
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {selectedTab === 0 && <GettingStarted />}
        {selectedTab === 1 && <RegisterHelp />}
        {selectedTab === 2 && <LoginHelp />}
      </Container>

      <Footer />
    </div>
  );
};

export default HelpNav;
