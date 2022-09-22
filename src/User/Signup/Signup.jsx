import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import Web3 from "web3";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  let selectedAccount;
  let ContractInstance;
  const [name, setName] = useState(null);
  const [age, setAge] = useState(0);
  const [cnic, setCnic] = useState(null);
  const [city, setCity] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const init = () => {
    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          selectedAccount = accounts[0];
          const web3 = new Web3(provider);
          ContractInstance = new web3.eth.Contract(
            CONTACT_ABI,
            CONTACT_ADDRESS
          );

          RegisterUser();
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  //to check if super admin is contract owner or not
  const RegisterUser = async () => {
    await ContractInstance.methods
      .registerUser(name, age, city, cnic, phoneNo)
      .send({ from: selectedAccount });
    navigate("/login", { replace: "true" });
  };

  return (
    <div>
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
                  <Form.Control
                    required
                    type="text"
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                  <Form.Label>CNIC</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="xxxxx-xxxxxxx-x"
                    onChange={(e) => setCnic(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="age"
                    required
                    onChange={(e) => setAge(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid age.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
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
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <br />
              <button
                className="y-btn"
                onClick={(event) => {
                  event.preventDefault();
                  init();
                }}
              >
                Signup
              </button>
            </Form>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
