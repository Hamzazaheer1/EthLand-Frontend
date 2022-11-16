import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useContext } from "react";
import { themeContext } from "../../Context";
import { CONTACT_ADDRESS, CONTACT_ABI } from "../../contract";
import Web3 from "web3";

const ViewAdmins = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  let ContractInstance;
  let selectedAccount;
  const [adminCount, setAdminCount] = useState();

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
      .ReturnAllAdminList()
      .call()
      .then((tx) => {
        setAdminCount(tx);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //to remove admin
  const removeAdmin = async (R_address) => {
    console.log(ContractInstance);
    await ContractInstance.methods
      .removeAdminAuthFailed(R_address)
      .send({ from: selectedAccount });
    alert("Admin Removed Sucessfully");
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {init()}
      <Container>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <br />
            <h2>View</h2>
            <h2>List of Admins</h2>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr style={{ color: darkMode ? "white" : "black" }}>
                  <th>#</th>
                  <th>Admin Address</th>
                  <th>Operation</th>
                </tr>
              </thead>
              {adminCount &&
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
                            removeAdmin(item);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </Table>
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewAdmins;
