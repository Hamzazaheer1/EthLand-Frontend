import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import Web3 from "web3";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";

const AddAdmin = () => {
  let selectedAccount;
  let ContractInstance;
  const [publicAddress, setPublicAddress] = useState(null);
  const [name, setName] = useState(null);
  const [age, setAge] = useState(0);
  const [designation, setDesignation] = useState(null);
  const [city, setCity] = useState(null);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  //metamask integration
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
          AddNewAdmin();
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  //to add new admin
  const AddNewAdmin = async () => {
    await ContractInstance.methods
      .addAdmin(publicAddress, name, age, designation, city)
      .send({ from: selectedAccount });
    alert("Admin registered Sucessfully.");
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <br />
            <h2>Register</h2>
            <h2>New Admin</h2>
            <br />
            <Form noValidate validated={validated}>
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
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="admin"
                    onChange={(e) => setDesignation(e.target.value)}
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
                <Form.Group as={Col} md="5" controlId="validationCustom03">
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
                <Form.Group
                  as={Col}
                  md="9"
                  controlId="validationCustom02"
                  className="mt-3"
                >
                  <Form.Label>Admin Public Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="0x0000000000000000000000000000000000000000"
                    onChange={(e) => setPublicAddress(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
              </Row>
              <br />
              <button
                className="y-btn"
                onClick={(event) => {
                  event.preventDefault();
                  {
                    init();
                  }
                }}
              >
                Register Admin
              </button>
            </Form>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddAdmin;
