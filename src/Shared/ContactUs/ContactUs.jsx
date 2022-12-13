import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "../../Context";
import { MdPrint, MdAddCall, MdPhoneCallback } from "react-icons/md";
import "./ContactUs.css";

const ContactUs = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div style={{ minHeight: "100vh", marginBottom: "-20rem" }}>
      <Container className="mt-5">
        <h2 style={{ color: "var(--yellow)", display: "flex" }}>
          Contact Us
          <p style={{ color: "gray", fontSize: "1rem", marginTop: "1rem" }}>
            &nbsp;&nbsp;feel free to contactus 24/7
          </p>
        </h2>
        <hr
          style={{
            color: darkMode ? "var(--yellow)" : "var(--black)",
            border: "2px solid",
          }}
        />
        <Row>
          <Col sm={5}>
            <address>
              <strong>Ethereum based Land Record - EthLand</strong>
              <br />
              Govt of the Pakistan
              <br />
              2-Kilometer Lorem ipsum dolor sit amet consectetur adipisicing
              elit.
              <br />
              (051) 11111111, 222222222, 33333333
            </address>
            <MdPrint style={{ fontSize: "16px" }} />
            &nbsp;Fax : (051) 99331122
            <br />
            <MdAddCall style={{ fontSize: "16px" }} />
            &nbsp;&nbsp;Contact DG EthLand: (052) 99332211
            <br />
            <MdPhoneCallback style={{ fontSize: "16px" }} />
            &nbsp;&nbsp;For Complaints UAN: (051) 111-22-22-33
          </Col>
          <Col sm={7}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
