import React, { useState } from "react";
import Footer from "../../Shared/Footer/Footer";
import NavigationBar from "../../Shared/NavigationBar/NavigationBar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";

const Signup = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div>
      <NavigationBar />
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <br />
            <br />
            <br />
            <h2>Signup</h2>
            <hr />
            <br />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control required type="text" placeholder="name" />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>CNIC</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="xxxxx-xxxxxxx-x"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Age</Form.Label>
                  <Form.Control type="number" placeholder="age" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid age.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="City" required />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid city.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="0xxx-xxxxxxx"
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <br />
              <button className="y-btn">Signup</button>
            </Form>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Signup;
