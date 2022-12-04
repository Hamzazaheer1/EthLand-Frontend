import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Land3 from "../../Shared/img/land3.png";

const AWelcome = () => {
  return (
    <Container>
      <Row>
        <Col sm={2}></Col>
        <Col sm={4}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <h2>Welcome to </h2>
          <h2>Admin Panel.</h2>
          <br />
        </Col>
        <Col sm={6}>
          <br />
          <br />
          <br />
          <img src={Land3} alt="notFound" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default AWelcome;
