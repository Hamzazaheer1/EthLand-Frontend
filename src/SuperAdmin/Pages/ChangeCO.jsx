import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";

const ChangeCO = () => {
  let selectedAccount;
  let ContractInstance;
  const [newSuperAdmin, setnewSuperAdmin] = useState("null");
  const navigate = useNavigate();

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
          ChangeSuperAdmin();
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid Public Key");
          return;
        });
    }
  };

  const ChangeSuperAdmin = async () => {
    await ContractInstance.methods
      .changeSuperAdmin(newSuperAdmin)
      .send({ from: selectedAccount });
    navigate("/", { replace: "true" });
  };

  return (
    <div>
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <br />
            <h2>Transfer</h2>
            <h2>Contract Ownership</h2>
            <br />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Public Key of New Owner</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="0x0000000000000000000000000000000000000000"
                  onChange={(e) => setnewSuperAdmin(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Please enter all 42 characters carefully. the process cannot
                  be Re done.
                </Form.Text>
              </Form.Group>
              <button
                className="y-btn"
                onClick={(event) => {
                  event.preventDefault();
                  {
                    init();
                  }
                }}
                type="submit"
              >
                Transfer
              </button>
            </Form>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangeCO;
