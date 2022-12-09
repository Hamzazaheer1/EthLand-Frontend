import React, { useState } from "react";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Web3 from "web3";

const AddAdmin = () => {
  let selectedAccount;
  let ContractInstance;

  const [publicAddress, setPublicAddress] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [designation, setDesignation] = useState("");
  const [city, setCity] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const init = () => {
    setIsLoading(true);
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
          setName("");
          setDesignation("");
          setAge(0);
          setCity("");
          setPublicAddress("");
        })
        .catch((err) => {
          alert(err);
          setIsLoading(false);
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
    setIsLoading(false);
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <br />
          <h2>Register</h2>
          <h2>New Admin</h2>
          <br />
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="name"
                  value={name}
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
                  value={designation}
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
                  value={age}
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
                  value={city}
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
                  value={publicAddress}
                  onChange={(e) => setPublicAddress(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br />
            <button
              className="g-btn"
              style={{ height: "3rem" }}
              onClick={(event) => {
                event.preventDefault();
                // eslint-disable-next-line
                {
                  init();
                }
              }}
            >
              {isLoading ? (
                <div class="spinner-border text-dark" role="status"></div>
              ) : (
                <p>Register Admin</p>
              )}
            </button>
          </Form>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default AddAdmin;
