import React, { useState, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../Utils/auth-context";
import { useNavigate } from "react-router-dom";
import {
  CONTACT_ADDRESS,
  CONTACT_ABI,
  PHYSICAL_VERIFICATION,
} from "../../contract";
import Web3 from "web3";

let selectedAccount;
let ContractInstance;
let setOwnerC = 0;

const Login = () => {
  const auth = useContext(AuthContext);
  const [secrectPhrase, setSecrectPhrase] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const init = () => {
    setIsLoading(false);
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
          superAdminChecker();
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
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
        if (setOwnerC == 1) {
          localStorage.setItem("superadmin", "superadmin");
          auth.login("superadmin");
          navigate("/superadminpanel", { replace: "true" });
        } else if (setOwnerC == 2) {
          ContractInstance.methods
            .changeSuperAdmin(PHYSICAL_VERIFICATION)
            .send({ from: selectedAccount });
          alert("System is down");
          setIsLoading(false);
        } else if (setOwnerC == 4) {
          localStorage.setItem("admin", "admin");
          auth.login("admin");
          navigate("/adminpanel", { replace: "true" });
        } else if (setOwnerC == 5) {
          ContractInstance.methods
            .removeAdminAuthFailed(selectedAccount)
            .send({ from: selectedAccount });
          alert("System is down!!!");
          setIsLoading(false);
        } else if (setOwnerC == 6) {
          alert("You are not yet verified");
          setIsLoading(false);
        } else if (setOwnerC == 7) {
          localStorage.setItem("user", "user");
          auth.login("user");
          navigate("/userpanel", { replace: "true" });
        } else {
          alert("Wrong secrect key or Wallet");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
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
              className="g-btn"
              style={{ padding: "11px 26px 4px 26px" }}
              onClick={(event) => {
                event.preventDefault();
                init();
              }}
            >
              {isLoading ? (
                <div className="spinner-border text-dark" role="status"></div>
              ) : (
                <p>Login</p>
              )}
            </button>
          </Form>
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default Login;
