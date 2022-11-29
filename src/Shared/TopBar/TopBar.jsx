import React from "react";
import { Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { IoCallSharp } from "react-icons/io5";

const TopBar = () => {
  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "var(--yellow)",
          paddingLeft: "1rem",
          color: "white",
          height: "2rem",
        }}
      >
        <Col sm={4}>
          <span style={{ fontWeight: "bold" }}>
            Pakistan Land Record Authority
          </span>
        </Col>
        <Col sm={6}></Col>
        <Col sm={2}>
          <IoCallSharp style={{ marginRight: "5px", paddingBottom: "2px" }} />
          Tel No.051-111-22-22-77
        </Col>
      </Navbar>
    </div>
  );
};

export default TopBar;
