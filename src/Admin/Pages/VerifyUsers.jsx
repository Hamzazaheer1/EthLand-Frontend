import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import { useContext } from "react";
import { themeContext } from "../../Context";
import Table from "react-bootstrap/Table";
import Web3 from "web3";

const VerifyUsers = () => {
  let selectedAccount;
  let ContractInstance;
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const [adminCount, setAdminCount] = useState();

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
          returnAllAdmins();
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    }
  };

  //to return Admins
  const returnAllAdmins = async () => {
    await ContractInstance.methods
      .ReturnAllUrverifiedUsers()
      .call()
      .then((tx) => {
        setAdminCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const VerifyUser = async (R_address) => {
    await ContractInstance.methods
      .verifyUser(R_address)
      .send({ from: selectedAccount });
    alert("User Verified Sucessfully");
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {init()}
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <br />
            <h2>Verify Users</h2>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr style={{ color: darkMode ? "white" : "black" }}>
                  <th>#</th>
                  <th>Users Address</th>
                  <th>Operation</th>
                </tr>
              </thead>
              {adminCount ? (
                adminCount.map((item, index) => (
                  <tbody>
                    <tr
                      style={{ backgroundColor: darkMode ? "white" : "white" }}
                    >
                      <td>{index + 1}</td>
                      <td>{item}</td>
                      <td>
                        <button
                          className="g-btn"
                          style={{ padding: "0px 20px 5px 20px" }}
                          onClick={(event) => {
                            event.preventDefault();
                            {
                              VerifyUser(item);
                            }
                          }}
                        >
                          Verify
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <h1>No user to be verified yet</h1>
              )}
            </Table>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyUsers;
