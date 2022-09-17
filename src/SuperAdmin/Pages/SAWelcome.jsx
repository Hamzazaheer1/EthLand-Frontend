import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Land1 from "../../Shared/img/land1.png";

const SAWelcome = () => {
  return (
    <div>
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
            <h2>Super Admin Panel.</h2>
            <br />
          </Col>
          <Col sm={6}>
            <br />
            <br />
            <br />
            <img src={Land1} alt="notFound" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SAWelcome;
