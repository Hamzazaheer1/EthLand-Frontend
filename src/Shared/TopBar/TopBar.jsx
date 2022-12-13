import React from "react";
import { Col } from "react-bootstrap";
import { IoCallSharp } from "react-icons/io5";
import Navbar from "react-bootstrap/Navbar";

const TopBar = () => {
  return (
    <Navbar
      style={{
        backgroundColor: "var(--yellow)",
        paddingLeft: "1rem",
        color: "white",
        height: "2rem",
      }}
    >
      <Col sm={4}>
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>
          Pakistan Land Record Authority
        </span>
      </Col>
      <Col sm={6}></Col>
      <Col sm={2}>
        <IoCallSharp
          style={{
            fontSize: "15px",
            marginRight: "5px",
            paddingBottom: "2px",
          }}
        />
        <span style={{ fontSize: "12px", fontWeight: "bold" }}>
          Tel No.051-111-22-22-77
        </span>
      </Col>
    </Navbar>
  );
};

export default TopBar;
