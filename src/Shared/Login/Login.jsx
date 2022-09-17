import React, { useState } from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import {
  CONTACT_ADDRESS,
  CONTACT_ABI,
  PHYSICAL_VERIFICATION,
} from "../../contract";

let selectedAccount;
let ContractInstance;
let setOwnerC = 0;

const Login = () => {
  const [secrectPhrase, setSecrectPhrase] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  const init = () => {
    let provider = window.ethereum;
    setIsConnected(true);
    if (typeof provider !== "undefined") {
      //metamask is installed

      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          selectedAccount = accounts[0];
          const web3 = new Web3(provider);
          ContractInstance = new web3.eth.Contract(
            CONTACT_ABI,
            CONTACT_ADDRESS
          );
          superAdminChecker();
        })
        .catch((err) => {
          setIsConnected(false);
          console.log(err);
          return;
        });
    }
  };

  const superAdminChecker = async () => {
    ContractInstance.methods
      .isLogin(selectedAccount, secrectPhrase)
      .call()
      .then((tx) => {
        setOwnerC = tx;
        console.log(setOwnerC);
        console.log(selectedAccount);
        console.log(secrectPhrase);
        if (setOwnerC == 1) {
          navigate("/superadminpanel", { replace: "true" });
        } else if (setOwnerC == 2) {
          ContractInstance.methods
            .changeSuperAdmin(PHYSICAL_VERIFICATION)
            .send({ from: selectedAccount });
          alert("System is down");
          setIsConnected(false);
        } else if (setOwnerC == 4) {
          navigate("/adminpanel", { replace: "true" });
        } else if (setOwnerC == 5) {
          console.log("i am 5");
          ContractInstance.methods
            .removeAdminAuthFailed(selectedAccount)
            .send({ from: selectedAccount });
          alert("System is down!!!");
          setIsConnected(false);
        } else if (setOwnerC == 6) {
          alert("You are not yet verified");
        } else if (setOwnerC == 7) {
          navigate("/userpanel", { replace: "true" });
        } else {
          alert("Wrong secrect key or Wallet");
          setIsConnected(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            <h2>Login</h2>
            <hr />
            <br />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Secret Key</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="SecretKey"
                  onChange={(e) => setSecrectPhrase(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your key with anyone else.
                </Form.Text>
              </Form.Group>
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
                Login
              </button>
            </Form>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
