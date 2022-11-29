import React, { useState } from "react";
import Web3 from "web3";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";

const PhysicalVerification = () => {
  let selectedAccount;
  let ContractInstance;
  const [physicalVerification, setPhysicalVerification] = useState("null");
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
          AddPhysicalVerification();
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid Public Key");
          return;
        });
    }
  };

  const AddPhysicalVerification = async () => {
    try {
      await ContractInstance.methods
        .addPhysicalVerification(physicalVerification)
        .send({ from: selectedAccount });
      alert("Physical Verification added Sucessfully");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5" style={{ minHeight: "100vh" }}>
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          <br />
          <h2>Add</h2>
          <h2>Physical Verification</h2>
          <br />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Public address of P-Verification Person</Form.Label>
              <Form.Control
                type="text"
                placeholder="0x0000000000000000000000000000000000000000"
                onChange={(e) => setPhysicalVerification(e.target.value)}
              />
              <Form.Text className="text-muted">
                Please enter all 42 characters carefully. the process cannot be
                Re done.
              </Form.Text>
            </Form.Group>
            <button
              className="g-btn"
              style={{ height: "3rem" }}
              onClick={(event) => {
                event.preventDefault();
                init();
              }}
              type="submit"
            >
              {isLoading ? (
                <div class="spinner-border text-dark" role="status"></div>
              ) : (
                <p>Add</p>
              )}
            </button>
          </Form>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default PhysicalVerification;
