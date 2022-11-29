import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { themeContext } from "../../Context";
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-printer-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
              <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
            </svg>{" "}
            &nbsp;Fax : (051) 99331122
            <br />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone-plus-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM12.5 1a.5.5 0 0 1 .5.5V3h1.5a.5.5 0 0 1 0 1H13v1.5a.5.5 0 0 1-1 0V4h-1.5a.5.5 0 0 1 0-1H12V1.5a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            &nbsp;&nbsp;Contact DG EthLand: (052) 99332211
            <br />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-telephone-inbound-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM15.854.146a.5.5 0 0 1 0 .708L11.707 5H14.5a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0v2.793L15.146.146a.5.5 0 0 1 .708 0z"
              />
            </svg>
            &nbsp;&nbsp;For Complaints UAN: (051) 111-22-22-33
          </Col>
          <Col sm={7}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
