import React from "react";
import Navbar from "react-bootstrap/Navbar";

const TopBar = () => {
  return (
    <div>
      <Navbar
        style={{
          backgroundColor: "var(--yellow)",
          paddingLeft: "1rem",
          // color: "var(--black)",
          color: "white",
        }}
      >
        <span style={{ fontWeight: "bold" }}>
          Pakistan Land Record Authority
        </span>
      </Navbar>
    </div>
  );
};

export default TopBar;
