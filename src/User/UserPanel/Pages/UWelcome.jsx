import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Land2 from "../../../Shared/img/land2.png";

const UWelcome = () => {
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
          <h2>User Panel.</h2>
          <br />
        </Col>
        <Col sm={6}>
          <br />
          <br />
          <br />
          <img src={Land2} alt="notFound" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default UWelcome;
